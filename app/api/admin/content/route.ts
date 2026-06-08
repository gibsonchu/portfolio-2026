import { NextRequest, NextResponse } from "next/server";
import portfolioContent from "@/data/portfolio-content.json";
import type { PortfolioContent } from "@/data/projects";

export const runtime = "nodejs";

const owner = "gibsonchu";
const repo = "portfolio-2026";
const branch = "main";
const contentPath = "data/portfolio-content.json";

type UploadedImage = {
  dataUrl: string;
  filename: string;
  path: string;
};

type SavePayload = {
  password?: string;
  content: PortfolioContent;
  uploads?: UploadedImage[];
};

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function getAuthToken() {
  return process.env.GITHUB_CONTENT_TOKEN || process.env.GITHUB_TOKEN;
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD;
}

function checkPassword(password: string | null | undefined) {
  const configured = getAdminPassword();

  return Boolean(configured && password === configured);
}

async function githubRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Missing GITHUB_CONTENT_TOKEN or GITHUB_TOKEN");
  }

  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return (await response.json()) as T;
}

async function getFileSha(path: string) {
  try {
    const result = await githubRequest<{ sha: string }>(`/repos/${owner}/${repo}/contents/${path}?ref=${branch}`);
    return result.sha;
  } catch {
    return undefined;
  }
}

function toBase64(value: string) {
  return Buffer.from(value).toString("base64");
}

function dataUrlToBase64(dataUrl: string) {
  const [, base64 = ""] = dataUrl.split(",");
  return base64;
}

export function safeFilename(filename: string) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function putFile(path: string, message: string, content: string, sha?: string) {
  return githubRequest(`/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      branch,
      content,
      message,
      sha
    })
  });
}

export async function GET() {
  return NextResponse.json(portfolioContent);
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as SavePayload;

  if (!getAdminPassword()) {
    return NextResponse.json({ error: "Missing ADMIN_PASSWORD in Vercel." }, { status: 500 });
  }

  if (!checkPassword(payload.password)) {
    return unauthorized();
  }

  try {
    const content = payload.content;
    const uploads = payload.uploads ?? [];

    for (const upload of uploads) {
      const uploadPath = upload.path.replace(/^\/+/, "");
      await putFile(uploadPath, `Upload portfolio image ${upload.filename}`, dataUrlToBase64(upload.dataUrl), await getFileSha(uploadPath));
    }

    const contentSha = await getFileSha(contentPath);
    await putFile(contentPath, "Update portfolio content from admin", toBase64(`${JSON.stringify(content, null, 2)}\n`), contentSha);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Save failed" }, { status: 500 });
  }
}
