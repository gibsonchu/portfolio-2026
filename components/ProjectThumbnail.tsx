import type { Project } from "@/data/projects";

type ProjectThumbnailProps = {
  project: Project;
  index: number;
};

export function ProjectThumbnail({ project, index }: ProjectThumbnailProps) {
  const blockCount = 3 + (index % 3);

  if (project.image) {
    return (
      <div className="relative h-full min-h-64 overflow-hidden bg-white" aria-hidden="true">
        <img src={project.image} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className="thumbnail-lines relative h-full min-h-64 overflow-hidden bg-stone-100"
      style={{
        backgroundColor: project.palette.wash
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-white/48" />
      <div className="absolute left-[12%] top-[16%] h-[62%] w-[66%] border border-current/35" style={{ color: project.palette.line }} />
      <div
        className="absolute left-[23%] top-[28%] h-[38%] w-[48%] border border-current/45"
        style={{ color: project.palette.line, transform: `skewY(${index % 2 === 0 ? "-10deg" : "8deg"})` }}
      />
      <div className="absolute bottom-[16%] left-[10%] right-[12%] h-px bg-current/35" style={{ color: project.palette.line }} />
      <div className="absolute left-[16%] right-[18%] top-[68%] grid grid-cols-5 gap-2">
        {Array.from({ length: blockCount }).map((_, itemIndex) => (
          <span
            key={itemIndex}
            className="h-5 border border-current/30 bg-white/20"
            style={{ color: project.palette.line }}
          />
        ))}
      </div>
      <div
        className="absolute -right-6 bottom-7 h-28 w-28 rounded-full border border-current/30"
        style={{ color: project.palette.line }}
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/55 to-transparent" />
    </div>
  );
}
