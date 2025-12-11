import towersData from '../data/towers.js';

export default class UIManager {
  constructor() {
    this.screens = {
      main: document.getElementById('main-menu'),
      levelSelect: document.getElementById('level-select'),
      settings: document.getElementById('settings'),
      overlay: document.getElementById('overlay'),
      pause: document.getElementById('pause-menu'),
      end: document.getElementById('end-screen')
    };
    this.buttons = {
      play: document.getElementById('play-button'),
      settings: document.getElementById('settings-button'),
      closeSettings: document.getElementById('close-settings'),
      backToMenu: document.getElementById('back-to-menu'),
      musicToggle: document.getElementById('music-toggle'),
      sfxToggle: document.getElementById('sfx-toggle'),
      speed: document.getElementById('speed-button'),
      pause: document.getElementById('pause-button'),
      nextWave: document.getElementById('next-wave'),
      resume: document.getElementById('resume-button'),
      restart: document.getElementById('restart-button'),
      quit: document.getElementById('quit-button'),
      retry: document.getElementById('retry-button'),
      backLevels: document.getElementById('back-levels')
    };
    this.labels = {
      money: document.getElementById('money'),
      lives: document.getElementById('lives'),
      wave: document.getElementById('wave'),
      totalWaves: document.getElementById('total-waves')
    };
    this.towerList = document.getElementById('tower-list');
    this.levelsList = document.getElementById('levels-list');
    this.towerInfo = document.getElementById('tower-info');
    this.towerName = document.getElementById('tower-name');
    this.towerStats = document.getElementById('tower-stats');
    this.upgradeBtn = document.getElementById('upgrade-button');
    this.sellBtn = document.getElementById('sell-button');
    this.messageBox = document.getElementById('message');
    this.endTitle = document.getElementById('end-title');
    this.endStats = document.getElementById('end-stats');
    this.settingsState = { musicMuted: false, sfxMuted: false };
    this.game = null;
    this._wireButtons();
  }

  setGame(game) {
    this.game = game;
  }

  _wireButtons() {
    this.buttons.play.addEventListener('click', () => this.showScreen('levelSelect'));
    this.buttons.settings.addEventListener('click', () => this.showScreen('settings'));
    this.buttons.closeSettings.addEventListener('click', () => this.showScreen('main'));
    this.buttons.backToMenu.addEventListener('click', () => this.showScreen('main'));

    this.buttons.musicToggle.addEventListener('click', () => {
      const state = this.buttons.musicToggle.dataset.state === 'on';
      this.settingsState.musicMuted = state;
      this.buttons.musicToggle.dataset.state = state ? 'off' : 'on';
      this.buttons.musicToggle.textContent = state ? 'Off' : 'On';
      this.game?.applySettings(this.settingsState);
    });

    this.buttons.sfxToggle.addEventListener('click', () => {
      const state = this.buttons.sfxToggle.dataset.state === 'on';
      this.settingsState.sfxMuted = state;
      this.buttons.sfxToggle.dataset.state = state ? 'off' : 'on';
      this.buttons.sfxToggle.textContent = state ? 'Off' : 'On';
      this.game?.applySettings(this.settingsState);
    });

    this.buttons.speed.addEventListener('click', () => this.game?.toggleSpeed());
    this.buttons.pause.addEventListener('click', () => this.game?.pause());
    this.buttons.nextWave.addEventListener('click', () => this.game?.startWave());
    this.buttons.resume.addEventListener('click', () => this.game?.resume());
    this.buttons.restart.addEventListener('click', () => this.game?.restartLevel());
    this.buttons.quit.addEventListener('click', () => this.game?.quitToMenu());
    this.buttons.retry.addEventListener('click', () => this.game?.restartLevel());
    this.buttons.backLevels.addEventListener('click', () => this.game?.backToLevelSelect());

    this.sellBtn.addEventListener('click', () => this.game?.sellSelectedTower());
    this.upgradeBtn.addEventListener('click', () => this.game?.upgradeSelectedTower());
  }

  showScreen(name) {
    Object.entries(this.screens).forEach(([key, el]) => {
      el.classList.toggle('visible', key === name);
      el.classList.toggle('hidden', key !== name);
    });
  }

  updateHUD({ money, lives, wave, totalWaves }) {
    this.labels.money.textContent = money;
    this.labels.lives.textContent = lives;
    this.labels.wave.textContent = wave;
    this.labels.totalWaves.textContent = totalWaves;
  }

  updateSpeedButton(speedMultiplier) {
    this.buttons.speed.textContent = `${speedMultiplier}x`;
  }

  populateTowerList(money, selectedId) {
    this.towerList.innerHTML = '';
    towersData.forEach((tower) => {
      const card = document.createElement('div');
      card.className = 'tower-card';
      if (tower.cost > money) card.classList.add('unaffordable');
      if (selectedId === tower.id) card.classList.add('selected');
      card.innerHTML = `<h4>${tower.name}</h4><div class="cost">Cost: ${tower.cost}</div>`;
      card.addEventListener('click', () => {
        if (tower.cost > money) return;
        this.game?.selectTowerToBuild(tower.id);
      });
      this.towerList.appendChild(card);
    });
  }

  populateLevels(levels, progress) {
    this.levelsList.innerHTML = '';
    levels.forEach((lvl) => {
      const btn = document.createElement('div');
      const unlocked = progress.includes(lvl.id) || lvl.id === 1 || progress.includes(lvl.id - 1);
      btn.className = 'level-button';
      if (!unlocked) btn.classList.add('locked');
      btn.textContent = `${lvl.name}`;
      btn.addEventListener('click', () => {
        if (!unlocked) return;
        this.game?.startLevel(lvl.id);
      });
      this.levelsList.appendChild(btn);
    });
  }

  showTowerInfo(tower, canUpgrade, upgradeCost, refund) {
    if (!tower) {
      this.towerInfo.classList.add('hidden');
      return;
    }
    this.towerInfo.classList.remove('hidden');
    this.towerName.textContent = `${tower.data.name} (Lv ${tower.level})`;
    this.towerStats.innerHTML = `
      <div>Damage: ${tower.damage.toFixed(0)}</div>
      <div>Range: ${tower.range.toFixed(0)}</div>
      <div>Fire Rate: ${tower.fireRate.toFixed(2)} /s</div>
    `;
    this.upgradeBtn.textContent = canUpgrade ? `Upgrade (${upgradeCost})` : 'Maxed';
    this.upgradeBtn.disabled = !canUpgrade;
    this.sellBtn.textContent = `Sell (+${refund})`;
  }

  flashMessage(text) {
    this.messageBox.textContent = text;
    this.messageBox.classList.remove('hidden');
    setTimeout(() => this.messageBox.classList.add('hidden'), 1200);
  }

  showEndScreen({ title, stats }) {
    this.endTitle.textContent = title;
    this.endStats.textContent = stats;
    this.showScreen('end');
  }
}
