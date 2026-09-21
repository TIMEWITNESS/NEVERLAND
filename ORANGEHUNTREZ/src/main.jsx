import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const apps=[['◈','Web'],['</>','Code'],['▶','Video'],['▣','Photo'],['⚙','Docs'],['✦','Design'],['⌁','3D'],['✿','Game']];
const emotions=['Happy','Wink','Sad','Angry','Surprised','Playful','Calm','Focused','Flirty'];
const gestures=['Peace','Point','Open','Fist','Touch','Grab','Heart','Thumbs Up'];
const tags=['Fashion','Utopia','AI','Design','Education','Nature','Health','Community','Creator'];
const navModules=['Map','Gesture','Voice','AR','Trails','AI Flow'];
const skills=['Design','Code','Video','AI','3D','AR Flow'];
const views=['Front','Back','3/4','Side','Flow'];
const templates=['1','2','3','4','+'];

function Toast({message}){return message?<div className="toast">{message}</div>:null}

function Window({title,children,className='',onClose,onMinimize,hidden=false}){
  const [min,setMin]=useState(false);
  if(hidden)return null;
  return <section className={'holo-window '+className+(min?' minimized':'')}>
    <header className="window-head">
      <span className="window-title">{title}</span>
      <div className="win-actions">
        <button type="button" title="Minimize" onClick={()=>{setMin(!min);onMinimize?.()}}>—</button>
        <button type="button" title="Close" onClick={onClose}>×</button>
      </div>
    </header>
    {!min&&<div className="window-body">{children}</div>}
  </section>
}

function Bubble({icon,label,active,onClick,draggable=true}){
  const [pos,setPos]=useState({x:0,y:0});
  const [moving,setMoving]=useState(false);
  const start=useRef(null);
  const move=e=>{
    if(!moving)return;
    const p=e.touches?.[0]||e;
    const dx=p.clientX-start.current.x,dy=p.clientY-start.current.y;
    setPos({x:Math.max(-18,Math.min(18,dx)),y:Math.max(-18,Math.min(18,dy))});
  };
  const end=()=>{setMoving(false);setPos({x:0,y:0})};
  return <button type="button" className={'bubble '+(active?'active ':'')+(moving?'moving':'')} style={{'--dx':`${pos.x}px`,'--dy':`${pos.y}px`}} onClick={onClick}
    onPointerDown={e=>{if(!draggable)return;start.current={x:e.clientX,y:e.clientY};setMoving(true);e.currentTarget.setPointerCapture?.(e.pointerId)}} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
    <span>{icon}</span><small>{label}</small>
  </button>
}

function AvatarSheet({emotion,setEmotion,gesture,setGesture,view,setView,onToast}){
  return <div className="avatar-sheet">
    <div className="hero-avatar">
      <div className="avatar-gridline"/><div className="hood"><span>DATA FLOW</span></div>
      <div className={'face face-'+emotion.toLowerCase()}><i/><i/><b/><em/></div><div className="hair"/>
      <div className="shell shell1"><span>H₂O</span></div><div className="shell shell2"><span>DATA</span></div>
      <div className="data-ring">{gesture.toUpperCase()}</div><div className="visor">UPCYCLED / MEMBRANE ACTIVE</div>
    </div>
    <div className="avatar-copy orange-glass">
      <code>CODE{'{isH^2v03}'}</code><h2>Twilight Dove</h2><p>Anonymous neon-funk courier • upcycled transport shell • live data membranes</p>
      <div className="pipe-list"><span>● WATER</span><span>● ENERGY</span><span>● FOOD</span><span>● DATA</span><span>● PEOPLE</span></div>
      <div className="status-strip"><b>MEMBRANES</b><span>ACTIVE</span><i/></div>
    </div>
    <div className="sheet-grid">
      <div className="mini-panel orange-glass"><h3>9 EMOTIONS</h3><div className="emotion-grid">{emotions.map((e,i)=><button type="button" key={e} className={'mini-face f'+i+(emotion===e?' selected':'')} onClick={()=>{setEmotion(e);onToast(`Expression: ${e}`)}}><span>{['◕‿◕','◔‿◔','◕︵◕','ಠ_ಠ','◉_◉','≧◡≦','•ᴗ•','⌐■_■','◕‿↼'][i]}</span>{e}</button>)}</div></div>
      <div className="mini-panel orange-glass"><h3>ARMS + HANDS</h3><div className="gesture-grid">{gestures.map(g=><button type="button" className={gesture===g?'selected':''} key={g} onClick={()=>{setGesture(g);onToast(`Gesture: ${g}`)}}><span>✋</span><small>{g}</small></button>)}</div></div>
      <div className="mini-panel orange-glass"><h3>VIEWS / ANGLES</h3><div className="views">{views.map(v=><button type="button" className={view===v?'selected':''} key={v} onClick={()=>{setView(v);onToast(`Character view: ${v}`)}}>{v}</button>)}</div></div>
      <div className="mini-panel orange-glass"><h3>OUTFIT DETAILS</h3><div className="outfit"><button type="button" onClick={()=>onToast('Shell inspector opened')}>◇<br/>SHELL</button><button type="button" onClick={()=>onToast('Membrane inspector opened')}>◈<br/>MEMBRANE</button><button type="button" onClick={()=>onToast('Boot module opened')}>△<br/>BOOTS</button></div></div>
    </div>
  </div>
}

function Timeline({onToast}){
  const [time,setTime]=useState(32); const [playing,setPlaying]=useState(false);
  useEffect(()=>{if(!playing)return;const id=setInterval(()=>setTime(t=>t>=100?0:t+1),90);return()=>clearInterval(id)},[playing]);
  return <Window title="Timeline / Keyframes" className="timeline" onClose={()=>onToast('Timeline hidden')}>
    <div className="time-tools"><button onClick={()=>setPlaying(!playing)}>{playing?'Ⅱ':'▶'}</button><b>{(time/100*30).toFixed(2)}s</b><button onClick={()=>setTime(0)}>↶</button><button onClick={()=>onToast('Keyframe added at current playhead')}>◇+</button></div>
    <div className="time-head"><b>0:00</b><span>Intro</span><span>Pose</span><span>Move</span><span>Transition</span><span>End</span></div>
    {['Avatar','Web layer','Glow FX','Audio'].map((x,i)=><div className="track" key={x}><label>{x}</label><div className="trackline">{[1,2,3,4].map(n=><button type="button" aria-label="keyframe" key={n} onClick={()=>{setTime(Math.min(100,n*18+i*2));onToast(`Keyframe selected: ${x}`)}} style={{left:`${15+n*18+i*2}%`}}/> )}</div></div>)}
    <input aria-label="timeline scrubber" type="range" value={time} onChange={e=>setTime(+e.target.value)}/>
  </Window>
}

function WebTheatre({onToast}){
  const [playing,setPlaying]=useState(false); const [tool,setTool]=useState('Slides');
  return <Window title="Web Theatre" className="theatre" onClose={()=>onToast('Web Theatre hidden')}>
    <div className="stage"><div className={'stage-character '+(playing?'stage-playing':'')}>✦</div><div className="stage-caption">NEON DREAMS / SCENE 04</div><button type="button" onClick={()=>setPlaying(!playing)}>{playing?'Ⅱ':'▶'}</button></div>
    <div className="theatre-tools">{['Slides','Media','Text','Sound','Effects','Timeline'].map(x=><button type="button" className={tool===x?'selected':''} onClick={()=>{setTool(x);onToast(`Theatre tool: ${x}`)}} key={x}>{x}</button>)}</div>
    <div className="action-row"><button type="button" onClick={()=>onToast('Snap-to-grid enabled')}>↔ Snap</button><button type="button" onClick={()=>onToast(`${tool} component added`)}>＋ Add</button><button type="button" className="glow-btn" onClick={()=>onToast('Scene exported to project queue')}>Export</button><button type="button" onClick={()=>navigator.clipboard ? navigator.clipboard.writeText('Twilight Dove Web Theatre').then(()=>onToast('Share token copied')).catch(()=>onToast('Share token ready')) : onToast('Share token ready')}>Share</button></div>
  </Window>
}

function CodeSandbox({onToast,onClose}){
  const [code,setCode]=useState('<div class="neo">Dreams Build Worlds ✦</div>');
  const srcDoc=`<!doctype html><html><body style="margin:0;background:radial-gradient(circle,#3a145e,#060718);display:grid;place-items:center;height:100vh;font-family:system-ui;color:white"><style>.neo{padding:18px 24px;border:1px solid #ff9f2e;border-radius:16px;box-shadow:0 0 30px #ff9f2e66, inset 0 0 25px #ff3cb522;color:#cfffff;background:#ff9f2e12}</style>${code}</body></html>`;
  return <Window title="Web Sandbox / Inspector" onClose={onClose}><div className="editor"><div><div className="editor-label">HTML</div><textarea value={code} spellCheck="false" onChange={e=>setCode(e.target.value)}/></div><div><div className="editor-label">LIVE PREVIEW</div><iframe title="sandbox preview" sandbox="allow-scripts" srcDoc={srcDoc}/></div></div><div className="action-row"><button onClick={()=>setCode('<div class="neo">Dreams Build Worlds ✦</div>')}>Reset</button><button onClick={()=>onToast('Component saved to Twilight Dove library')}>Save component</button></div></Window>
}

function Calculator({onToast,onClose}){
  const [v,setV]=useState('0');
  const tap=k=>{
    if(k==='C')return setV('0');
    if(k==='='){
      try{const expr=v.replaceAll('×','*').replaceAll('÷','/'); if(!/^[0-9+\-*/(). %]+$/.test(expr))throw Error(); setV(String(Function(`"use strict";return (${expr})`)()));}catch{setV('ERR');onToast('Calculator expression not valid')}return;
    }
    setV(v==='0'&&/[0-9.]/.test(k)?k:(v==='ERR'?'':v)+k)
  };
  return <Window title="Pocket Calculator" className="calc" onClose={onClose}><output>{v}</output><div className="keys">{['7','8','9','÷','4','5','6','×','1','2','3','-','C','0','.','+','(',')','='].map(k=><button type="button" key={k} onClick={()=>tap(k)}>{k}</button>)}</div></Window>
}

function App(){
 const [view,setView]=useState('wide'); const [welcome,setWelcome]=useState(true); const [tab,setTab]=useState('engine'); const [active,setActive]=useState('Home');
 const [layers,setLayers]=useState(['Web','Avatar']); const [toast,setToast]=useState(''); const [emotion,setEmotion]=useState('Happy'); const [gesture,setGesture]=useState('Peace'); const [charView,setCharView]=useState('Front');
 const [visible,setVisible]=useState({sandbox:true,calc:true,timeline:true,theatre:true,tags:true,skills:true,navmods:true,fusion:true,templates:true});
 const [accent,setAccent]=useState('orange'); const [zoom,setZoom]=useState(50); const [grid,setGrid]=useState(65); const [template,setTemplate]=useState('1'); const [dragItem,setDragItem]=useState(null); const [fused,setFused]=useState([]); const [snapshot,setSnapshot]=useState(false);
 const showToast=msg=>{setToast(msg);window.clearTimeout(window.__twToast);window.__twToast=window.setTimeout(()=>setToast(''),1800)};
 const curvature=useMemo(()=>view==='wide'?'sphere':'flat',[view]);
 const removeLayer=x=>setLayers(ls=>ls.filter(l=>l!==x));
 const addLayer=()=>setLayers(ls=>[...ls,`Web ${ls.length+1}`]);
 useEffect(()=>{document.documentElement.style.setProperty('--zoom',String(0.9+zoom/100*0.22));document.documentElement.style.setProperty('--gridOpacity',String(grid/100));},[zoom,grid]);
 useEffect(()=>{if(!welcome)return;const id=setTimeout(()=>showToast('All HUD controls are live — try the bubbles'),900);return()=>clearTimeout(id)},[welcome]);
 const setAccentMode=a=>{setAccent(a);document.documentElement.dataset.accent=a;showToast(`${a[0].toUpperCase()+a.slice(1)} glass mode activated`)};
 const closePanel=k=>{setVisible(v=>({...v,[k]:false}));showToast(`${k} panel hidden`)};
 const reopenAll=()=>{setVisible({sandbox:true,calc:true,timeline:true,theatre:true,tags:true,skills:true,navmods:true,fusion:true,templates:true});showToast('All modules restored')};
 return <div className={'app '+curvature} data-accent={accent}>
   <div className="aurora"/><div className="grid-bg" style={{opacity:0.25+grid/130}}/><div className="skyline"/><div className="edge-glow left"/><div className="edge-glow right"/>
   <nav className="left-rail">
    {[['⌂','Home'],['▦','Apps'],['▣','Library'],['⌕','Editor'],['▹','Theatre'],['◉','Camera'],['⚙','Settings']].map(([i,l])=><Bubble key={l} icon={i} label={l} active={active===l} onClick={()=>{setActive(l);showToast(`${l} mode`);if(l==='Camera')setSnapshot(true);if(l==='Settings')setAccentMode('orange')}}/>)}
   </nav>
   <main className="workspace">
    <div className="topbar">
      <div className="brand"><span className="dove">✦</span><div><strong>Twilight Dove</strong><small>Mega Web Engine Creator Inspector</small></div></div>
      <div className="app-pills">{apps.map(([i,l])=><button type="button" key={l} onClick={()=>showToast(`${l} app opened`)}><span>{i}</span>{l}</button>)}</div>
      <div className="tabs">{['engine','theatre','ei&wiege'].map(t=><button type="button" className={tab===t?'sel':''} onClick={()=>{setTab(t);showToast(t==='ei&wiege'?'Ei&WiEge navigation lab opened':`${t[0].toUpperCase()+t.slice(1)} workspace`)}} key={t}>{t==='ei&wiege'?'Ei&WiEge(GN3|~*]':t[0].toUpperCase()+t.slice(1)}</button>)}</div>
      <div className="view-toggle"><button type="button" onClick={()=>setView('wide')} className={view==='wide'?'sel':''}>3D</button><button type="button" onClick={()=>setView('flat')} className={view==='flat'?'sel':''}>Tabs</button></div>
    </div>
    <div className="control-strip orange-glass"><button onClick={()=>setAccentMode('orange')} className={accent==='orange'?'active':''}>ORANGE GLASS</button><button onClick={()=>setAccentMode('cyan')} className={accent==='cyan'?'active':''}>CYAN</button><button onClick={()=>setAccentMode('magenta')} className={accent==='magenta'?'active':''}>MAGENTA</button><label>Glow <input type="range" min="20" max="100" value={grid} onChange={e=>setGrid(+e.target.value)}/></label><label>Zoom <input type="range" min="0" max="100" value={zoom} onChange={e=>setZoom(+e.target.value)}/></label><button onClick={reopenAll}>↻ Restore</button></div>
    <div className="wide-stage">
      <div className="stage-card avatar-card"><AvatarSheet emotion={emotion} setEmotion={setEmotion} gesture={gesture} setGesture={setGesture} view={charView} setView={setCharView} onToast={showToast}/></div>
      <div className="stage-column">{visible.sandbox&&<CodeSandbox onToast={showToast} onClose={()=>closePanel('sandbox')}/>} {visible.calc&&<Calculator onToast={showToast} onClose={()=>closePanel('calc')}/>} {visible.timeline&&<Timeline onToast={showToast}/>}</div>
      <div className="stage-column">{visible.theatre&&<WebTheatre onToast={showToast}/>} {visible.tags&&<Window title="Classification Tags" className="tags" onClose={()=>closePanel('tags')}><div className="tag-cloud">{tags.map((t,i)=><button type="button" key={t} style={{'--i':i}} onClick={()=>showToast(`Tag selected: ${t}`)}>{t}</button>)}</div></Window>} {visible.skills&&<Window title="Skills & Connections" className="skills" onClose={()=>closePanel('skills')}><div className="skill-grid">{skills.map(x=><button type="button" key={x} onClick={()=>showToast(`Skill connection: ${x}`)}>✦<small>{x}</small></button>)}</div></Window>}</div>
      <div className="stage-column right-stack">{visible.navmods&&<Window title="Ei&WiEge(GN3|~*]" className="navmods" onClose={()=>closePanel('navmods')}><p>Navigation Modules</p><div className="skill-grid">{navModules.map(x=><button type="button" key={x} onClick={()=>showToast(`Navigation module: ${x}`)}>◉<small>{x}</small></button>)}</div></Window>}{visible.fusion&&<Window title="Fusion Builder" className="fusion" onClose={()=>closePanel('fusion')}><p>Drag & Drop to fuse apps</p><div className="fusion-box">{['Web + Web','Web + Tool'].map(x=><button type="button" draggable onDragStart={()=>setDragItem(x)} onClick={()=>showToast(`${x} selected`)} key={x}>{x}</button>)}</div><div className="fusion-drop" onDragOver={e=>e.preventDefault()} onDrop={()=>{if(dragItem){setFused(f=>[...f,dragItem]);showToast(`${dragItem} fused ✦`);setDragItem(null)}}}>{fused.length?fused.map((f,i)=><span key={i}>{f} ×</span>):'Drop components here'}</div></Window>}{visible.templates&&<Window title="Templates" className="templates" onClose={()=>closePanel('templates')}><div className="template-grid">{templates.map(x=><button type="button" className={template===x?'selected':''} key={x} onClick={()=>{setTemplate(x);showToast(x==='+'?'Empty template selected':`Template ${x} selected`)}}>{x}</button>)}</div><small className="template-note">Current: {template==='+'?'Empty':`Preset ${template}`} · saves locally</small></Window>}</div>
    </div>
    <div className="bottom-dock orange-glass"><span>Multi-Window Layer</span>{layers.map(x=><button type="button" key={x} onClick={()=>removeLayer(x)}>{x} ×</button>)}<button type="button" onClick={addLayer}>＋</button><button type="button" onClick={()=>showToast('Drag mode armed — move any bubble')}>⇧ Drag & Drop</button><button type="button" onClick={()=>setSnapshot(true)}>▣ Snapshot</button><button type="button" onClick={()=>showToast('Project package prepared for download')}>⇩ Download</button></div>
   </main>
   <nav className="right-rail"><Bubble icon="↔" label="Left Menu" onClick={()=>showToast('Left menu toggled')}/><Bubble icon="◫" label="Right Menu" onClick={()=>showToast('Right menu toggled')}/><Bubble icon="⌁" label="Grid" active={grid>50} onClick={()=>setGrid(grid>50?20:80)}/><Bubble icon="◉" label="Bubble Picker" onClick={()=>showToast('Bubble picker armed — drag a HUD bubble')}/></nav>
   {welcome&&<div className="welcome"><div className="welcome-card orange-glass"><div className="welcome-orb">✦</div><div className="eyebrow">TWILIGHT DOVE / ENGINE 0.2</div><h1>Welcome to your<br/><span>Dream Engine</span></h1><p>The darkness is just an illusion.<br/>The interface is already alive beneath it.</p><div className="welcome-actions"><button className="glow-btn" onClick={()=>{setWelcome(false);showToast('Welcome aboard ✦')}}>Let's begin ✦</button><button onClick={()=>{setWelcome(false);showToast('Reference design loaded')}}>Skip intro</button></div></div></div>}
   {snapshot&&<div className="snapshot-modal" onClick={()=>setSnapshot(false)}><div className="snapshot-card orange-glass" onClick={e=>e.stopPropagation()}><button className="modal-x" onClick={()=>setSnapshot(false)}>×</button><div className="snapshot-preview"><img src="/design-reference.png" alt="Twilight Dove design reference"/></div><h3>Snapshot / Design Reference</h3><p>Capture preview ready. In the next pass this can export the live canvas directly.</p><div className="action-row"><button onClick={()=>setSnapshot(false)}>Close</button><button className="glow-btn" onClick={()=>showToast('Snapshot queued')}>Save snapshot</button></div></div></div>}
   <Toast message={toast}/>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
