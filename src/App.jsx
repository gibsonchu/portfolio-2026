import React, { useEffect, useState } from 'react';
import content from './content.json';
const markups = Object.fromEntries(Object.entries(content).map(([k,v]) => [k, {__html:v}]));
const profileMarkup = markups.profile;
// Keep trusted source markup mounted while the clock and hover preview update.
// Replacing innerHTML during pointer movement can detach a clicked link.
const StaticMarkup = React.memo(function StaticMarkup({ as: Tag = 'div', markup, className }) {
  return <Tag className={className} dangerouslySetInnerHTML={markup} />;
});

function sizePage() {
  const w = document.documentElement.clientWidth, h = window.innerHeight;
  const portrait = w / h <= .8;
  const mobile = portrait || (w / h >= 2 / 3 && h <= 500);
  const weight = (mobile && !portrait ? 18 : 9) + 5 * Math.min(1, Math.max(0, h / w - 1) / .777777778);
  const base = Math.max(20, Math.min(w, h) * weight / 100) * .16;
  const rem = base * (mobile ? 1.4 : 1);
  document.documentElement.style.fontSize = `${rem}px`;
  document.documentElement.style.setProperty('--pad', `${1.5 * rem * (mobile ? .66 : 1)}px`);
  document.documentElement.style.setProperty('--panel-indent', `${10 * rem * (mobile ? .66 : 1)}px`);
  document.documentElement.style.setProperty('--gutter', `${Math.floor(rem)}px`);
  document.documentElement.classList.toggle('mobile', mobile);

}

export function App() {
  const initial = location.pathname.slice(1);
  const [panel, setPanel] = useState(content[initial] && initial !== 'profile' ? initial : null);
  const [clock, setClock] = useState(new Date());
  const [zoom, setZoom] = useState(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    sizePage();
    window.addEventListener('resize', sizePage);
    const timer = setInterval(() => setClock(new Date()), 1000);
    const pop = () => { const key = location.pathname.slice(1); setPanel(content[key] && key !== 'profile' ? key : null); };
    window.addEventListener('popstate', pop);
    return () => { clearInterval(timer); window.removeEventListener('resize', sizePage); window.removeEventListener('popstate', pop); };
  }, []);
  useEffect(() => { sizePage(); }, [panel]);
  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : '';
    const escape = e => { if (e.key === 'Escape') { setZoom(null); setPreview(null); if (!zoom) navigate(null); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [zoom]);
  function navigate(next) {
    setPanel(next); setPreview(null);
    history.pushState({}, '', next ? `/${next}` : '/');
    window.scrollTo(0, 0);
  }
  function click(e) {
    const img = e.target.closest('[data-zoom]');
    if (img) { setZoom(img.dataset.full || img.src); setPreview(null); return; }
    const a = e.target.closest('a');
    if (a?.hasAttribute('data-panel')) { e.preventDefault(); navigate(a.dataset.panel); }
    else if (a?.hasAttribute('data-home')) { e.preventDefault(); navigate(null); }
    else if (panel && !e.target.closest('.panel') && !a) navigate(null);
  }
  function move(e) {
    const a = e.target.closest('.project-link[data-image]');
    if (!a || e.pointerType === 'touch') { setPreview(null); return; }
    const above = a.classList.contains('essays-link');
    setPreview({src: a.dataset.image, x: Math.max(20, Math.min(e.clientX + 40, innerWidth - 380)), y: Math.max(20, Math.min(e.clientY - (above ? 310 : 135), innerHeight - 290))});
  }
  return <div onClick={click} onPointerMove={move} onPointerLeave={() => setPreview(null)} onKeyDown={e => { if (e.target.matches('[data-zoom]') && ['Enter', ' '].includes(e.key)) {e.preventDefault(); setZoom(e.target.dataset.full || e.target.src);} }}>
    <time className="clock">{clock.toLocaleTimeString('en-GB', {hour12:false})}</time>
    <StaticMarkup as="main" className="profile" markup={profileMarkup} />
    {panel && <aside className={`panel ${panel}`} aria-label={panel.replaceAll('-', ' ')}><StaticMarkup className="panel-content" markup={markups[panel]} /></aside>}
    {preview && <div className="hover-preview" style={{left:preview.x,top:preview.y,backgroundImage:`url("${preview.src}")`}} />}
    {zoom && <div className="zoom" role="dialog" aria-label="Enlarged photograph" aria-modal="true" onClick={e => {e.stopPropagation(); setZoom(null);}}><img src={zoom} alt="Shinkansen, Kyoto, Japan" /></div>}
  </div>;
}
