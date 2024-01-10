import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';

export async function initNoirForCircuit(circuitPath): Promise<Noir> {
    const res = await fetch(new URL(circuitPath, import.meta.url));
    const compiled = JSON.parse(await res.text());
    const backend = new BarretenbergBackend(compiled);
    return new Noir(compiled, backend);
} 