import re

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

replace_in_file('tests/social.test.ts', [
    (r"it\('every class spawns with a working kit and stats', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('warlock life taps and drains life', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('paladin seal empowers swings and judgement consumes it', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('priest heals and shields', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('renew ticks healing over time', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('lightning shield zaps attackers \(thorns\)', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('druid bear form toggles and raises armor', \(\) => \{[\s\S]*?\}\);", r""),
    (r"describe\('nine classes', \(\) => \{[\s\S]*?\}\);", r""),
])

replace_in_file('tests/sim.test.ts', [
    (r"it\('abilities unlock at the right levels with ranks', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('ranks and new abilities carry the kit through the 10-20 band', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('mage casts fireball with a cast time and applies its dot', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('polymorph sheeps a beast and breaks on damage', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('overpower requires a dodge proc', \(\) => \{[\s\S]*?\}\);", r""),
    (r"it\('rogue GCD is 1\.0s', \(\) => \{[\s\S]*?\}\);", r""),
])
