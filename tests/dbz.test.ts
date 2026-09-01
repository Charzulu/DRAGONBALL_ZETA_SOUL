import { describe, expect, it } from 'vitest';
import { Sim } from '../src/sim/sim';

describe('DBZ Mini-game', () => {
  it('toggles dbz state and allows dbz commands', () => {
    const sim = new Sim({ seed: 1, playerClass: 'warrior' });
    sim.addPlayer('warrior', 'Goku');
    const pid = sim.playerId;

    // Toggle on
    sim.chat('/dbz', pid);
    let state = sim.serializeCharacter(pid)?.dbzState;
    expect(state?.active).toBe(true);

    // Initial values
    expect(state?.ki).toBe(0);
    expect(state?.energy).toBe(100);

    // Rest when max energy doesn't go over max
    sim.chat('/dbz rest', pid);
    state = sim.serializeCharacter(pid)?.dbzState;
    expect(state?.energy).toBe(100);

    // Charge uses energy and adds ki
    sim.chat('/dbz charge', pid);
    state = sim.serializeCharacter(pid)?.dbzState;
    expect(state?.ki).toBe(10);
    expect(state?.energy).toBe(90);

    // Blast uses ki
    // need 20 ki to blast, charge again
    sim.chat('/dbz charge', pid);
    state = sim.serializeCharacter(pid)?.dbzState;
    expect(state?.ki).toBe(20);
    expect(state?.energy).toBe(80);

    sim.chat('/dbz blast', pid);
    state = sim.serializeCharacter(pid)?.dbzState;
    expect(state?.ki).toBe(0);
    expect(state?.energy).toBe(80);

    // Rest restores energy
    sim.chat('/dbz rest', pid);
    state = sim.serializeCharacter(pid)?.dbzState;
    expect(state?.energy).toBe(100);
  });
});
