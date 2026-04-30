type PlayerStats = {
    health: number;
    mana: number;
    experience: number;
};

function initializePlayerStats(): PlayerStats {
    return { health: 100, mana: 50, experience: 0 }; 
}

function levelUp(stats: PlayerStats): PlayerStats {
    stats.experience = 0;
    stats.health += 20;
    stats.mana += 10;
    return stats;
}

function takeDamage(stats: PlayerStats, damage: number): PlayerStats {
    stats.health -= damage;
    if (stats.health < 0) stats.health = 0;
    return stats;
}

function gainExperience(stats: PlayerStats, amount: number): PlayerStats {
    stats.experience += amount;
    return stats;
}

function restoreHealth(stats: PlayerStats, amount: number): PlayerStats {
    stats.health += amount;
    if (stats.health > 100) stats.health = 100;
    return stats;
}

export { initializePlayerStats, levelUp, takeDamage, gainExperience, restoreHealth };