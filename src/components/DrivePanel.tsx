import { useEffect, useState } from 'react';

import type { BeltGeometryResult, Sketch } from '../model';
import type { SketchAction } from '../state';
import { calculateTransmissionSpeeds, migrateLegacyTransmission } from '../transmission';

export default function DrivePanel({ sketch, onAction }: {
  sketch: Sketch; geometry: BeltGeometryResult; onAction: (action: SketchAction) => void;
}) {
  const transmission = sketch.transmission ?? migrateLegacyTransmission(sketch);
  const parts = [...sketch.pulleys, ...transmission.gears.map(g => ({ id: g.id, label: g.name, toothCount: g.toothCount }))];
  const remaining = new Set(parts.map(p => p.id));
  const trains: (typeof parts)[] = [];
  for (const part of parts) {
    if (!remaining.has(part.id)) continue;
    const { speeds } = calculateTransmissionSpeeds(transmission, part.id, 1);
    const members = parts.filter(p => p.id in speeds);
    for (const member of members) remaining.delete(member.id);
    if (members.length >= 2) trains.push(members);
  }
  const connected = trains.find(train => train.some(p => p.id === sketch.drive?.driverId)) ?? trains[0] ?? [];
  const driverId = connected.find(p => p.id === sketch.drive?.driverId)?.id ?? connected[0]?.id ?? '';
  const outputId = connected.find(p => p.id === sketch.drive?.outputId)?.id ?? connected.at(-1)?.id ?? '';
  const rpm = sketch.drive?.driverRpm ?? null;
  const [rpmDraft, setRpmDraft] = useState(rpm === null ? '' : String(rpm));
  useEffect(() => setRpmDraft(rpm === null ? '' : String(rpm)), [rpm]);
  const { speeds, conflict } = calculateTransmissionSpeeds(transmission, driverId, 1);
  const multiplier = speeds[outputId];
  const outputRpm = rpm !== null && multiplier !== undefined ? rpm * multiplier : null;
  const commitRpm = () => {
    const value = rpmDraft.trim() ? Number(rpmDraft) : null;
    if (value !== null && (!Number.isFinite(value) || value < 0)) { setRpmDraft(rpm === null ? '' : String(rpm)); return; }
    onAction({ type: 'SET_DRIVE', changes: { driverRpm: value } });
  };
  return <section className="drive-panel panel-section" aria-label="Pulley drive ratio">
    <div className="panel-section-heading"><span className="panel-section-title">Drive ratio</span></div>
    {connected.length >= 2 ? <>
      <label className="drive-field"><span>Train</span><select value={connected[0]!.id} onChange={e => { const train = trains.find(t => t[0]!.id === e.target.value)!; onAction({type:"SET_DRIVE", changes:{driverId:train[0]!.id, outputId:train.at(-1)!.id}}); }}>{trains.map((t,i) => <option key={t[0]!.id} value={t[0]!.id}>Train {i+1} · {t[0]!.label}</option>)}</select></label>
      <label className="drive-field"><span>Driver</span><select aria-label="Driving component" value={driverId}
        onChange={event => onAction({ type: 'SET_DRIVE', changes: { driverId: event.target.value } })}>
        {connected.map(pulley => <option key={pulley.id} value={pulley.id}>{pulley.label} · {pulley.toothCount}T</option>)}
      </select></label>
      <label className="drive-field"><span>Driven output</span><select aria-label="Driven component" value={outputId}
        onChange={event => onAction({ type: 'SET_DRIVE', changes: { outputId: event.target.value } })}>
        {connected.map(pulley => <option key={pulley.id} value={pulley.id}>{pulley.label} · {pulley.toothCount}T</option>)}
      </select></label>
      <label className="drive-field"><span>Driver RPM</span><input type="text" inputMode="decimal" aria-label="Driver RPM"
        placeholder="Optional" value={rpmDraft} onChange={event => setRpmDraft(event.target.value)} onBlur={commitRpm}
        onKeyDown={event => { if (event.key === 'Enter') event.currentTarget.blur(); }} /></label>
      {conflict && <p role="status">{conflict}</p>}
      {!conflict && multiplier !== undefined && <div className="calculation-values drive-values">
        <div className="drive-primary"><span title="Driver speed ÷ output speed">Reduction</span><b>{(1 / Math.abs(multiplier)).toFixed(3)} : 1</b></div>
        {outputRpm !== null && outputRpm !== undefined && <div className="drive-primary"><span>Output RPM</span><b>{outputRpm.toLocaleString('en-US', { maximumFractionDigits: 2 })}</b></div>}
        {<div className="drive-direction"><span>Rotation</span><b>{multiplier < 0 ? 'Opposite direction' : 'Same direction'}</b></div>}
      </div>}
    </> : <div className="empty-properties">Mesh two gears or close a belt to calculate a train ratio.</div>}
  </section>;
}
