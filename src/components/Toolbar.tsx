import { useRef } from 'react';
import type { SketchTool } from '../model';
import Icon from './Icon';
import type { IconName } from './Icon';

type ToolbarProps = {
  tool: SketchTool;
  canUndo: boolean;
  canRedo: boolean;
  onToolChange: (tool: SketchTool) => void;
  onUndo: () => void;
  onRedo: () => void;
  onFit: () => void;
  onReset: () => void;
};

function ToolButton({ tool, current, icon, label, shortcut, onClick }: {
  tool: SketchTool;
  current: SketchTool;
  icon: IconName;
  label: string;
  shortcut?: string;
  onClick: () => void;
}) {
  return <button
    className={`tool-button${current === tool ? ' active' : ''}`}
    type="button"
    title={shortcut ? `${label} · ${shortcut}` : label}
    aria-label={label}
    aria-pressed={current === tool}
    onClick={onClick}
  >
    <span className="tool-icon"><Icon name={icon} size={17} /></span>
    <span className="tool-label">{label}</span>
    {shortcut && <kbd>{shortcut}</kbd>}
  </button>;
}

export default function Toolbar({ tool, canUndo, canRedo, onToolChange, onUndo, onRedo, onFit, onReset }: ToolbarProps) {
  const moreToolsRef = useRef<HTMLDetailsElement>(null);
  const select = (next: SketchTool) => onToolChange(tool === next ? 'select' : next);
  const selectSecondary = (next: SketchTool) => {
    select(next);
    if (moreToolsRef.current) moreToolsRef.current.open = false;
  };
  return <nav className="toolbar" aria-label="Sketch tools">
    <div className="toolbar-group primary-tools">
      <ToolButton tool="select" current={tool} icon="pointer" label="Select" shortcut="V" onClick={() => select('select')} />
      <ToolButton tool="pan" current={tool} icon="pan" label="Pan" shortcut="Space" onClick={() => select('pan')} />
      <ToolButton tool="add-pulley" current={tool} icon="pulley" label="Add pulley" onClick={() => select('add-pulley')} />
      <ToolButton tool="add-gear" current={tool} icon="gear" label="Add gear" onClick={() => select("add-gear")} />
      <ToolButton tool="add-idler" current={tool} icon="tensioner" label="Add tensioner" onClick={() => select('add-idler')} />
      <ToolButton tool="route" current={tool} icon="belt" label="Create belt" onClick={() => select('route')} />
    </div>
    <details
      className="toolbar-more"
      ref={moreToolsRef}
      onKeyDown={(event) => { if (event.key === 'Escape') moreToolsRef.current?.removeAttribute('open'); }}
    >
      <summary className={`more-tools-button${tool.startsWith('dimension-') || tool.startsWith('constraint-') || tool === 'delete' ? ' secondary-active' : ''}`} aria-label="More tools">
        More tools <Icon name="chevron-down" size={15} />
      </summary>
      <div className="toolbar-more-menu" role="group" aria-label="Dimensions, constraints, and deletion">
        <ToolButton tool="dimension-horizontal" current={tool} icon="horizontal" label="Horizontal dimension" shortcut="X" onClick={() => selectSecondary('dimension-horizontal')} />
        <ToolButton tool="dimension-vertical" current={tool} icon="vertical" label="Vertical dimension" shortcut="Y" onClick={() => selectSecondary('dimension-vertical')} />
        <ToolButton tool="dimension-aligned" current={tool} icon="ruler" label="Center distance" shortcut="D" onClick={() => selectSecondary('dimension-aligned')} />
        <ToolButton tool="constraint-horizontal" current={tool} icon="horizontal" label="Horizontal constraint" onClick={() => selectSecondary('constraint-horizontal')} />
        <ToolButton tool="constraint-vertical" current={tool} icon="vertical" label="Vertical constraint" onClick={() => selectSecondary('constraint-vertical')} />
        <ToolButton tool="delete" current={tool} icon="trash" label="Delete geometry" onClick={() => selectSecondary('delete')} />
      </div>
    </details>
    <div className="toolbar-spacer" />
    <div className="toolbar-group view-tools">
      <button className="icon-button" type="button" title="Home · fit all geometry" aria-label="Home — fit all geometry" onClick={onFit}><Icon name="home" /></button>
      <button className="icon-button" type="button" title="Reset view" aria-label="Reset view" onClick={onReset}><Icon name="reset" /></button>
      <span className="toolbar-divider compact" />
      <button className="icon-button" type="button" title="Undo · Ctrl/⌘ Z" aria-label="Undo" disabled={!canUndo} onClick={onUndo}><Icon name="undo" /></button>
      <button className="icon-button" type="button" title="Redo · Ctrl/⌘ Shift Z" aria-label="Redo" disabled={!canRedo} onClick={onRedo}><Icon name="redo" /></button>
    </div>
  </nav>;
}
