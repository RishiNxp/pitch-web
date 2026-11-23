import Icon from './Icon';

export default function WelcomePage({ onStart, onOpenFile }: {
  onStart: () => void;
  onOpenFile: () => void;
}) {
  return <>
    <header className="welcome-topbar">
      <div className="welcome-brand" aria-label="Pitch robotics drive layout">
        <span className="brand-symbol"><img className="pitch-logo" src="/pitch-logo.png" alt="" /></span>
        <span><b>Pitch</b><small>ROBOTICS DRIVE LAYOUT</small></span>
      </div>
      <button className="topbar-action welcome-open" type="button" onClick={onOpenFile}>
        <Icon name="folder" size={16} />Open saved layout
      </button>
    </header>

    <main className="welcome-main">
      <section className="welcome-copy" aria-labelledby="welcome-title">
        <h1 id="welcome-title">Design your robot’s drivetrain.</h1>
        <p className="welcome-description">Mesh gears, route belts, and stack components on shared axles. See how motion travels from the driver to any output in your train.</p>
        <div className="welcome-actions">
          <button className="welcome-primary" type="button" onClick={onStart}>
            Start a layout
            <Icon name="arrow-right" size={17} />
          </button>
        </div>

        <div className="welcome-workflow" aria-label="Calculator workflow">
          <div className="workflow-step"><span className="workflow-icon"><Icon name="pulley" size={17} /></span><div><b>Place components</b><p>Set gear modules, pulley sizes, and shaft centers.</p></div></div>
          <div className="workflow-step"><span className="workflow-icon"><Icon name="belt" size={17} /></span><div><b>Connect the train</b><p>Mesh pitch circles or route a belt through a tensioner.</p></div></div>
          <div className="workflow-step"><span className="workflow-icon"><Icon name="gear" size={17} /></span><div><b>Check the drive</b><p>Compare speed and direction across stages.</p></div></div>
        </div>
      </section>

      <div className="welcome-canvas-wrap">
        <div className="welcome-canvas-bar"><span>Compound drivetrain</span><span>XY plane</span></div>
        <div className="welcome-canvas-preview" role="img" aria-label="A pinion drives a larger gear on a shared pulley shaft, with a belt to the output shaft">
          <svg viewBox="0 0 510 310" className="welcome-drawing" aria-hidden="true">
            <g fill="none" stroke="#878e95" strokeWidth="4"><path d="M207 140 L393 83 A33 33 0 1 1 412 146 L226 203 A33 33 0 1 1 207 140Z"/></g>
            {[[112,171,38,18],[217,171,67,32]].map(([x,y,r,n]) => <g key={x} transform={`translate(${x} ${y})`}>
              <polygon fill="#25262a" stroke="#d56a72" strokeWidth="2" points={Array.from({length:n*4},(_,i)=>{const a=i*Math.PI/(2*n), radius=r+(i%4===1||i%4===2?3:-3);return [radius*Math.cos(a),radius*Math.sin(a)].join(',')}).join(' ')}/>
              <circle r={r} fill="none" stroke="#bd535e" strokeDasharray="5 4"/>
            </g>)}
            {[[112,171,9],[217,171,32],[402,115,32]].map(([x,y,r])=><g key={x}><circle cx={x} cy={y} r={r} fill="#15171a" stroke="#b6bbc0" strokeWidth="2"/><circle cx={x} cy={y} r="5" fill="#ec626e"/></g>)}
            <g fill="#c6c9cb" fontSize="13"><text x="63" y="240">Input pinion</text><text x="181" y="267">Shared shaft</text><text x="378" y="60">Output</text></g>
          </svg>
        </div>
      </div>
    </main>
  </>;
}
