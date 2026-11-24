(function () {
  'use strict';

  const EXTRACTED_RAW = window.ER_EXTRACTED_ASSETS || null;
  const USE_EXTRACTED = Boolean(
    EXTRACTED_RAW &&
    Object.values(EXTRACTED_RAW).some((arr) => Array.isArray(arr) && arr.length > 0)
  );
  const RAW_ASSET = (USE_EXTRACTED ? EXTRACTED_RAW : window.ER_ASSETS) || {};
  const META = (USE_EXTRACTED && window.ER_ASSET_META) || { baseDir: 'extracted_assets', labels: {}, characters: {} };
  const LABELS = META.labels || {};
  const CHAR_META = META.characters || {};

  const FOLDERS = USE_EXTRACTED
    ? {
        teamBackgrounds: `${META.baseDir || 'extracted_assets'}/teamBackgrounds`,
        avatars: `${META.baseDir || 'extracted_assets'}/avatars`,
        borders: `${META.baseDir || 'extracted_assets'}/borders`,
        characterBackgrounds: `${META.baseDir || 'extracted_assets'}/characterBackgrounds`,
        characterPortraits: `${META.baseDir || 'extracted_assets'}/characterPortraits`,
        halfSkins: `${META.baseDir || 'extracted_assets'}/halfSkins`,
        fullSkins: `${META.baseDir || 'extracted_assets'}/fullSkins`,
      }
    : {
        teamBackgrounds: '队伍格背景',
        avatars: '头像',
        borders: '边框',
        characterBackgrounds: '人物背景',
        characterPortraits: '实验体头像',
        halfSkins: 'Half皮肤',
        fullSkins: 'Full皮肤',
      };

  // ==================== 字体预设库（含离线系统字体与在线开源字体双兜底 + 自定义本机字体） ====================
  const FONT_PRESETS = [
    { key: 'default', label: '默认雅黑（实机标准）', family: '"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif' },
    { key: 'noto-sans', label: '思源黑体（现代无衬线）', family: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif' },
    { key: 'simhei', label: '硬朗中黑（纯正粗黑）', family: '"SimHei", "Heiti SC", "Microsoft YaHei", sans-serif' },
    { key: 'dengxian', label: '清秀等线（纤细现代）', family: '"DengXian", "Microsoft YaHei UI Light", "PingFang SC", sans-serif' },
    { key: 'serif', label: '思源宋体（典雅衬线）', family: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif' },
    { key: 'xiaowei', label: '站酷小薇（文艺古典）', family: '"ZCOOL XiaoWei", "STKaiti", "KaiTi", serif' },
    { key: 'kaiti', label: '传统楷体（温润手书）', family: '"STKaiti", "KaiTi", "Kaiti SC", serif' },
    { key: 'brush', label: '马善政毛笔（潇洒行草）', family: '"Ma Shan Zheng", "STXingkai", "KaiTi", cursive' },
    { key: 'round', label: '圆润快乐体 / 幼圆', family: '"ZCOOL KuaiLe", "YouYuan", "Microsoft YaHei", sans-serif' },
    { key: 'kr', label: '韩服原版（Malgun Gothic）', family: '"Malgun Gothic", "Apple SD Gothic Neo", "Microsoft YaHei", sans-serif' },
    { key: 'esports', label: '电竞机甲（Orbitron 科技）', family: '"Orbitron", "Bahnschrift", "Impact", "Microsoft YaHei", sans-serif' },
    { key: 'custom', label: '自定义本机字体…', family: '' },
  ];

  function resolveFontFamily(fontKey, customFont) {
    if (fontKey === 'custom') {
      const cleaned = String(customFont || '').replace(/["'<>]/g, '').trim();
      if (cleaned) return `"${cleaned}", "PingFang SC", "Microsoft YaHei", sans-serif`;
    }
    const hit = FONT_PRESETS.find((f) => f.key === fontKey) || FONT_PRESETS[0];
    return hit.family || FONT_PRESETS[0].family;
  }

  const cleanList = (arr) => (arr || []).filter((f) => /\.(png|webp|jpg|jpeg)$/i.test(f));
  const ASSET = {
    teamBackgrounds: cleanList(RAW_ASSET.teamBackgrounds),
    avatars: cleanList(RAW_ASSET.avatars),
    characterPortraits: cleanList(RAW_ASSET.characterPortraits),
    halfSkins: cleanList(RAW_ASSET.halfSkins),
    fullSkins: cleanList(RAW_ASSET.fullSkins),
    characterBackgrounds: cleanList(RAW_ASSET.characterBackgrounds),
    borders: cleanList(RAW_ASSET.borders),
  };

  const assetPath = (folder, file) => {
    if (!file) return '';
    const encodedFolder = String(folder || '')
      .split('/')
      .filter(Boolean)
      .map((seg) => encodeURIComponent(seg))
      .join('/');
    return `${encodedFolder}/${encodeURIComponent(file)}`;
  };
  const stripExt = (file) => String(file || '').replace(/\.(png|webp|jpg|jpeg)$/i, '');
  const rawZhLabel = (file) => LABELS[file] || stripExt(file);
  const findAsset = (items, pred, fallback = '') => items.find(pred) || fallback || items[0] || '';
  const firstDefault = (items, hint) => findAsset(items, (f) => f.includes(hint) || rawZhLabel(f).includes(hint));

  function parseRawCharFile(file) {
    const m = stripExt(file).match(/^(?:CharProfile|CharFull|CharHalf|CharLobby)_([A-Za-z0-9]+)_S(\d{3})(?:_(.+))?$/i);
    if (!m) return null;
    return { token: m[1], skinIdx: Number(m[2]), extra: m[3] || '' };
  }

  const allSkinCharacters = USE_EXTRACTED
    ? Array.from(
        new Set(
          ASSET.halfSkins
            .map((f) => parseRawCharFile(f)?.token)
            .filter(Boolean)
        )
      ).sort((a, b) => (CHAR_META[a]?.code || 999) - (CHAR_META[b]?.code || 999))
    : Array.from(new Set(ASSET.halfSkins.map((f) => f.split('_Half_')[0]))).sort((a, b) => b.length - a.length);

  const basePortraits = (() => {
    if (USE_EXTRACTED) {
      const s000 = ASSET.characterPortraits
        .filter((f) => /_S000(?:_|\.)/i.test(f))
        .sort((a, b) => {
          const ta = parseRawCharFile(a)?.token || '';
          const tb = parseRawCharFile(b)?.token || '';
          return (CHAR_META[ta]?.code || 999) - (CHAR_META[tb]?.code || 999);
        });
      return s000.length >= 20 ? s000 : ASSET.characterPortraits;
    }
    const baseSet = new Set(allSkinCharacters.map((c) => `${c}.png`));
    const exact = ASSET.characterPortraits.filter((f) => baseSet.has(f));
    return exact.length >= 20 ? exact : ASSET.characterPortraits;
  })();

  const characterForPortrait = (file) => {
    if (USE_EXTRACTED) {
      const parsed = parseRawCharFile(file);
      if (parsed) {
        return allSkinCharacters.find((t) => t.toLowerCase() === parsed.token.toLowerCase()) || parsed.token;
      }
    }
    return allSkinCharacters.find((name) => stripExt(file) === name || file.includes(name)) || stripExt(file).replace(/头像$/, '').trim();
  };

  const characterDisplayName = (characterKey) => {
    if (!characterKey) return '';
    if (USE_EXTRACTED) {
      const hit = CHAR_META[characterKey] || Object.values(CHAR_META).find((c) => c.token?.toLowerCase() === characterKey.toLowerCase());
      if (hit?.name) return hit.name;
    }
    return characterKey;
  };

  const skinsFor = (character, variant) => {
    const pool = variant === 'full' ? ASSET.fullSkins : ASSET.halfSkins;
    if (USE_EXTRACTED) {
      const target = String(character || '').toLowerCase();
      return pool.filter((f) => parseRawCharFile(f)?.token.toLowerCase() === target);
    }
    const token = variant === 'full' ? '_Full_' : '_Half_';
    return pool.filter((f) => f.startsWith(`${character}${token}`));
  };

  const isDefaultSkinFile = (file) =>
    USE_EXTRACTED ? /_S000(?:_|\.)/i.test(file) : file.includes('默认');

  function cleanDisplayLabel(file, kind) {
    let s = rawZhLabel(file);
    if (kind === 'skin') {
      s = s.replace(/^.+?_(Half|Full)_/, '');
    } else if (kind === 'background') {
      s = s.replace(/队伍格背景$/, '');
    } else if (kind === 'roleBackground') {
      s = s.replace(/\s*背景$/, '');
    }
    return s.trim() || rawZhLabel(file);
  }

  const displaySkinTitle = (characterKey, file, variant) => {
    const charZh = characterDisplayName(characterKey);
    if (!file) return charZh;
    if (USE_EXTRACTED) {
      if (isDefaultSkinFile(file)) return charZh;
      const zh = LABELS[file];
      return zh && zh !== '默认' ? zh : charZh;
    }
    const marker = variant === 'full' ? '_Full_' : '_Half_';
    const raw = stripExt(file).split(marker)[1] || stripExt(file);
    return raw === '默认' ? charZh : raw;
  };

  const defaultCharFile = findAsset(
    basePortraits,
    (f) => f === '阿迪娜.png' || /_Adina_S000\./i.test(f) || rawZhLabel(f) === '阿迪娜' || /_YuMin_S000\./i.test(f) || rawZhLabel(f).includes('俞岷')
  );
  const defaultCharKey = characterForPortrait(defaultCharFile);
  const defaultCharZh = characterDisplayName(defaultCharKey);
  const defaultHalf = findAsset(skinsFor(defaultCharKey, 'half'), isDefaultSkinFile);
  const defaultFull = findAsset(skinsFor(defaultCharKey, 'full'), isDefaultSkinFile);

  // ==================== 280x512 (306x560) 实机加载界面像素级基准原点 ====================
  const ROLE_BASE = {
    halfX: 51.0,
    halfY: 50.0,
    halfWidth: 104.5,
    fullX: 51.0,
    fullY: 52.0,
    fullWidth: 82.0,
    avatarX: 18.4,
    avatarY: 75.8,
    avatarWidth: 19.3,
    textRight: 17.0,
    textY: 74.8,
  };

  const ROLE_DEFAULTS = {
    halfTransform: { x: 0, y: 0, scale: 100 },
    fullTransform: { x: 0, y: 0, scale: 100 },
    avatarOffsetX: 0,
    avatarOffsetY: 0,
    avatarScale: 100,
    textOffsetX: 0,
    textOffsetY: 0,
    skinFontSize: 16.5,
    nameFontSize: 18.5,
  };

  // ==================== 队伍大厅基准原点（严格对齐 S5 CYBERS / S6 MENU / S10 & S11 CNJ 官方凹槽） ====================
  // 282x643 实心卡面对称中轴 X=50.0%，头像 Y=37.9%，名字牌中心 Y=52.3%（间距 4.2%），统一规整最小宽度 38.6%
  const TEAM_BASE = {
    avatarX: 50.0,
    avatarY: 37.9,
    avatarWidth: 46.5,
    nameX: 50.0,
    nameGapY: 4.2,
  };
  const TEAM_AV_BASE_H_PCT = TEAM_BASE.avatarWidth * (282 / 643); // 20.393%

  const TEAM_SLOT_DEFAULTS = {
    avatarOffsetX: 0,
    avatarOffsetY: 0,
    avatarScale: 100,
    nameOffsetX: 0,
    nameOffsetY: 0,
    nameFontSize: 14,
    nameMinWidth: 38.6,
    nameBgOpacity: 68,
  };

  const makeRoleConfig = () => ({
    playerName: '核爆',
    fontKey: 'default',
    customFont: '',
    character: defaultCharFile,
    characterKey: defaultCharKey,
    variant: 'half',
    halfSkin: defaultHalf,
    fullSkin: defaultFull,
    skin: defaultHalf,
    skinLabel: displaySkinTitle(defaultCharKey, defaultHalf, 'half'),
    skinColor: '#78d9ff',
    background:
      firstDefault(ASSET.characterBackgrounds, defaultCharZh) ||
      findAsset(ASSET.characterBackgrounds, (f) => /_Bg_001\./i.test(f)) ||
      firstDefault(ASSET.characterBackgrounds, '默认背景'),
    border:
      firstDefault(ASSET.borders, defaultCharZh) ||
      findAsset(ASSET.borders, (f) => /_Outline_001\./i.test(f)) ||
      firstDefault(ASSET.borders, '默认框'),
    avatar: firstDefault(ASSET.avatars, defaultCharZh) || ASSET.avatars[0] || '',
    halfTransform: { ...ROLE_DEFAULTS.halfTransform },
    fullTransform: { ...ROLE_DEFAULTS.fullTransform },
    avatarOffsetX: ROLE_DEFAULTS.avatarOffsetX,
    avatarOffsetY: ROLE_DEFAULTS.avatarOffsetY,
    avatarScale: ROLE_DEFAULTS.avatarScale,
    textOffsetX: ROLE_DEFAULTS.textOffsetX,
    textOffsetY: ROLE_DEFAULTS.textOffsetY,
    skinFontSize: ROLE_DEFAULTS.skinFontSize,
    nameFontSize: ROLE_DEFAULTS.nameFontSize,
    showBadges: true,
    primaryTrait: 'havoc',
    subTrait: 'chaos',
  });

  const DEFAULT_TEAM_IDS = ['核爆', '神秘吹风男', '鸿璐', '四号队友'];
  const cnjDefaultBg = findAsset(
    ASSET.teamBackgrounds,
    (f) => f.includes('3402564') || rawZhLabel(f).includes('CNJ'),
    ASSET.teamBackgrounds[0] || ''
  );
  const makeTeamSlot = (enabled, idx) => ({
    enabled,
    statusText: idx === 0 ? '正在确认结果' : '大厅',
    statusBusy: idx === 0,
    name: DEFAULT_TEAM_IDS[idx] || `PLAYER 0${idx + 1}`,
    background: idx === 0 ? cnjDefaultBg : (ASSET.teamBackgrounds[idx % Math.max(1, ASSET.teamBackgrounds.length)] || ''),
    avatar: ASSET.avatars[(idx * 5) % Math.max(1, ASSET.avatars.length)] || '',
    ...TEAM_SLOT_DEFAULTS,
  });

  // 升级版本号至 v9：平滑继承已选角色/背景/头像/昵称，同步升级队伍名字牌对称居中与字体系统
  const STORAGE_KEY = 'er-plate-studio-calibrated-v9';
  const LEGACY_KEYS = [
    'er-plate-studio-calibrated-v8',
    'er-plate-studio-calibrated-v7',
    'er-plate-studio-calibrated-v6',
    'er-plate-studio-calibrated-v5',
  ];
  const THEME_KEY = 'er-plate-theme-v2';

  const clamp = (v, min, max) => Math.min(max, Math.max(min, Number(v)));
  const num = (v, fb, min, max) => (Number.isFinite(Number(v)) ? clamp(v, min, max) : fb);
  const fmtSigned = (v, unit = '%') => {
    const n = Math.round(Number(v) * 10) / 10;
    if (n > 0) return `+${n}${unit}`;
    return `${n}${unit}`;
  };

  function loadState() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const base = {
      mode: 'role',
      theme: savedTheme === 'dark' ? 'dark' : 'light',
      showClosedTeamSlots: true,
      selectedTeamSlot: 0,
      teamFontKey: 'default',
      teamCustomFont: '',
      role: makeRoleConfig(),
      teamSlots: [makeTeamSlot(true, 0), makeTeamSlot(true, 1), makeTeamSlot(true, 2), makeTeamSlot(false, 3)],
    };
    try {
      const rawV9 = localStorage.getItem(STORAGE_KEY);
      const isMigrating = !rawV9;
      let legacyRaw = null;
      if (isMigrating) {
        for (const k of LEGACY_KEYS) {
          legacyRaw = localStorage.getItem(k);
          if (legacyRaw) break;
        }
      }
      const saved = JSON.parse(rawV9 || legacyRaw || 'null');
      if (!saved || typeof saved !== 'object') return base;
      base.mode = saved.mode === 'team' ? 'team' : 'role';
      base.showClosedTeamSlots = saved.showClosedTeamSlots !== false;
      base.selectedTeamSlot = num(saved.selectedTeamSlot, 0, 0, 3);
      if (saved.teamFontKey) base.teamFontKey = saved.teamFontKey;
      if (saved.teamCustomFont !== undefined) base.teamCustomFont = saved.teamCustomFont;

      if (saved.role && typeof saved.role === 'object') {
        const freshRole = base.role;
        if (isMigrating) {
          const keepKeys = [
            'playerName', 'fontKey', 'customFont', 'character', 'characterKey', 'variant',
            'halfSkin', 'fullSkin', 'skin', 'skinLabel', 'skinColor',
            'background', 'border', 'avatar', 'showBadges', 'primaryTrait', 'subTrait',
          ];
          keepKeys.forEach((k) => {
            if (saved.role[k] !== undefined) base.role[k] = saved.role[k];
          });
        } else {
          base.role = {
            ...freshRole,
            ...saved.role,
            halfTransform: { ...freshRole.halfTransform, ...(saved.role.halfTransform || {}) },
            fullTransform: { ...freshRole.fullTransform, ...(saved.role.fullTransform || {}) },
          };
        }
        const matchInPool = (pool, file, fb) => {
          if (!file) return fb;
          if (pool.includes(file)) return file;
          const stem = stripExt(file);
          return pool.find((x) => stripExt(x) === stem) || fb;
        };
        const resolvedChar = matchInPool(ASSET.characterPortraits, base.role.character, '');
        if (!resolvedChar) {
          base.role.character = freshRole.character;
          base.role.characterKey = freshRole.characterKey;
          base.role.halfSkin = freshRole.halfSkin;
          base.role.fullSkin = freshRole.fullSkin;
          base.role.skin = base.role.variant === 'full' ? freshRole.fullSkin : freshRole.halfSkin;
          base.role.skinLabel = displaySkinTitle(freshRole.characterKey, base.role.skin, base.role.variant);
        } else {
          base.role.character = resolvedChar;
          base.role.halfSkin = matchInPool(ASSET.halfSkins, base.role.halfSkin, freshRole.halfSkin);
          base.role.fullSkin = matchInPool(ASSET.fullSkins, base.role.fullSkin, freshRole.fullSkin);
          const activePool = base.role.variant === 'full' ? ASSET.fullSkins : ASSET.halfSkins;
          base.role.skin = matchInPool(activePool, base.role.skin, base.role.variant === 'full' ? base.role.fullSkin : base.role.halfSkin);
        }
        base.role.background = matchInPool(ASSET.characterBackgrounds, base.role.background, freshRole.background);
        base.role.border = matchInPool(ASSET.borders, base.role.border, freshRole.border);
        base.role.avatar = matchInPool(ASSET.avatars, base.role.avatar, freshRole.avatar);
      }
      if (Array.isArray(saved.teamSlots) && saved.teamSlots.length === 4) {
        const matchTeam = (pool, file, fb) => {
          if (!file) return fb;
          if (pool.includes(file)) return file;
          const stem = stripExt(file);
          return pool.find((x) => stripExt(x) === stem) || fb;
        };
        base.teamSlots = base.teamSlots.map((s, i) => {
          const prev = saved.teamSlots[i] || {};
          const merged = isMigrating
            ? {
                ...s,
                enabled: prev.enabled !== undefined ? prev.enabled : s.enabled,
                statusText: prev.statusText !== undefined ? prev.statusText : s.statusText,
                statusBusy: prev.statusBusy !== undefined ? prev.statusBusy : s.statusBusy,
                name: prev.name || s.name,
                background: prev.background || s.background,
                avatar: prev.avatar || s.avatar,
              }
            : { ...s, ...prev };
          merged.background = matchTeam(ASSET.teamBackgrounds, merged.background, s.background);
          merged.avatar = matchTeam(ASSET.avatars, merged.avatar, s.avatar);
          return merged;
        });
      }
    } catch {}
    return base;
  }

  const state = loadState();
  const el = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const currentArtTransform = () => (state.role.variant === 'full' ? state.role.fullTransform : state.role.halfTransform);

  function computeRoleMetrics(r) {
    const isFull = r.variant === 'full';
    const tf = isFull ? r.fullTransform : r.halfTransform;
    const baseArtX = isFull ? ROLE_BASE.fullX : ROLE_BASE.halfX;
    const baseArtY = isFull ? ROLE_BASE.fullY : ROLE_BASE.halfY;
    const baseArtW = isFull ? ROLE_BASE.fullWidth : ROLE_BASE.halfWidth;
    return {
      artX: baseArtX + num(tf.x, 0, -45, 45),
      artY: baseArtY + num(tf.y, 0, -45, 45),
      artWidth: baseArtW * (num(tf.scale, 100, 40, 180) / 100),
      avatarX: ROLE_BASE.avatarX + num(r.avatarOffsetX, 0, -20, 40),
      avatarY: ROLE_BASE.avatarY + num(r.avatarOffsetY, 0, -25, 20),
      avatarWidth: ROLE_BASE.avatarWidth * (num(r.avatarScale, 100, 50, 160) / 100),
      textRight: Math.max(1, ROLE_BASE.textRight - num(r.textOffsetX, 0, -25, 16)),
      textY: ROLE_BASE.textY + num(r.textOffsetY, 0, -25, 20),
    };
  }

  function computeTeamMetrics(s) {
    const avScale = num(s.avatarScale, 100, 50, 150);
    const avWidthPct = TEAM_BASE.avatarWidth * (avScale / 100);
    const avX = TEAM_BASE.avatarX + num(s.avatarOffsetX, 0, -30, 30);
    const avY = TEAM_BASE.avatarY + num(s.avatarOffsetY, 0, -25, 25);
    const avHalfHeightPct = (TEAM_AV_BASE_H_PCT * (avScale / 100)) / 2;
    const nameX = TEAM_BASE.nameX + num(s.nameOffsetX, 0, -30, 30);
    const nameCenterY = avY + avHalfHeightPct + TEAM_BASE.nameGapY + num(s.nameOffsetY, 0, -10, 15);
    const nameMinWidth = num(s.nameMinWidth, TEAM_SLOT_DEFAULTS.nameMinWidth, 18, 75);
    return { avWidthPct, avX, avY, nameX, nameCenterY, nameMinWidth };
  }

  let saveTimer;
  function persist() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    }, 80);
  }

  let toastTimer;
  function showToast(msg) {
    const t = el('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  let rolePosOpen = false;
  let teamPosOpen = false;

  const collapsedPickers = new Set();
  const pickerScrollMap = new Map();
  const pickerSearchMap = new Map();
  const panelScrollEl = document.querySelector('.panel-scroll');
  let outerScrollLockUntil = 0;

  if (panelScrollEl) {
    panelScrollEl.addEventListener('wheel', (e) => {
      const insideGrid = e.target.closest('.asset-grid');
      if (!insideGrid || performance.now() < outerScrollLockUntil) {
        outerScrollLockUntil = performance.now() + 420;
      }
    }, { passive: true });
  }

  function fontSelectHtml(selectId, customInputId, barId, curKey, curCustom, labelText) {
    const isCustom = curKey === 'custom';
    return `<div class="field">
      <label for="${selectId}">${labelText}</label>
      <div class="font-bar${isCustom ? ' has-custom' : ''}" id="${barId}">
        <select id="${selectId}">
          ${FONT_PRESETS.map((f) => `<option value="${f.key}" ${curKey === f.key ? 'selected' : ''}>${esc(f.label)}</option>`).join('')}
        </select>
        <input id="${customInputId}" type="text" placeholder="输入本机字体名，如：得意黑" value="${esc(curCustom || '')}" ${isCustom ? '' : 'hidden'}>
      </div>
    </div>`;
  }

  function pickerHtml(title, searchHint, kind, folder) {
    const pickerKey = `${state.mode}:${kind}`;
    const isCollapsed = collapsedPickers.has(pickerKey);
    const savedQuery = pickerSearchMap.get(pickerKey) || '';
    return `<div class="field picker${isCollapsed ? ' is-collapsed' : ''}" data-picker-kind="${kind}" data-folder="${folder}">
      <div class="picker-head">
        <span class="field-label">${title}</span>
        <span class="picker-head-right">
          <span class="picker-count"></span>
          <button type="button" class="picker-collapse-btn">${isCollapsed ? '展开' : '收起'}</button>
        </span>
      </div>
      <input class="picker-search" type="search" value="${esc(savedQuery)}" placeholder="搜索${searchHint}…">
      <div class="asset-grid"></div>
    </div>`;
  }

  function mountPicker(root, kind, getOptions, getSelected, onPick) {
    const box = root.querySelector(`[data-picker-kind="${kind}"]`);
    if (!box) return null;
    const titleEl = box.querySelector('.field-label');
    const input = box.querySelector('.picker-search');
    const grid = box.querySelector('.asset-grid');
    const countEl = box.querySelector('.picker-count');
    const collapseBtn = box.querySelector('.picker-collapse-btn');
    const pickerKey = `${state.mode}:${kind}`;
    const BATCH = 120;

    let currentList = [];
    let renderedCount = 0;

    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        const isNowCollapsed = box.classList.toggle('is-collapsed');
        if (isNowCollapsed) collapsedPickers.add(pickerKey);
        else collapsedPickers.delete(pickerKey);
        collapseBtn.textContent = isNowCollapsed ? '展开' : '收起';
      });
    }

    grid.addEventListener('mousedown', () => { outerScrollLockUntil = 0; });
    grid.addEventListener('wheel', (e) => {
      if (panelScrollEl && performance.now() < outerScrollLockUntil) {
        e.preventDefault();
        panelScrollEl.scrollTop += e.deltaY;
        outerScrollLockUntil = performance.now() + 420;
      }
    }, { passive: false });

    const createOptionBtn = (file, sel) => {
      const folder = box.dataset.folder;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.file = file;
      btn.className = `asset-option${file === sel ? ' selected' : ''}`;
      const label = cleanDisplayLabel(file, kind);
      const fullZh = rawZhLabel(file);
      btn.title = USE_EXTRACTED && fullZh !== stripExt(file) ? `${fullZh}\n(${file})` : stripExt(file);
      btn.innerHTML = `<img src="${assetPath(folder, file)}" alt="" loading="lazy"><span>${esc(label)}</span>`;
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.asset-option.selected').forEach((node) => node.classList.remove('selected'));
        btn.classList.add('selected');
        pickerScrollMap.set(pickerKey, grid.scrollTop);
        onPick(file);
      });
      return btn;
    };

    const appendMore = (targetCount) => {
      const sel = getSelected();
      const end = Math.min(currentList.length, targetCount);
      if (end <= renderedCount) return;
      const frag = document.createDocumentFragment();
      for (let i = renderedCount; i < end; i += 1) {
        frag.appendChild(createOptionBtn(currentList[i], sel));
      }
      grid.appendChild(frag);
      renderedCount = end;
    };

    grid.addEventListener('scroll', () => {
      pickerScrollMap.set(pickerKey, grid.scrollTop);
      if (renderedCount < currentList.length && grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 180) {
        appendMore(renderedCount + BATCH);
      }
    }, { passive: true });

    const rebuild = (preserveScroll = true) => {
      const options = typeof getOptions === 'function' ? getOptions() : getOptions;
      const q = (input.value || '').trim().toLowerCase();
      pickerSearchMap.set(pickerKey, input.value || '');
      const sel = getSelected();

      currentList = options.filter((f) => {
        if (!q) return true;
        return f.toLowerCase().includes(q) || rawZhLabel(f).toLowerCase().includes(q);
      });
      countEl.textContent = `${options.length} 项`;
      renderedCount = 0;

      if (!currentList.length) {
        grid.innerHTML = '<div class="asset-empty">无匹配素材</div>';
        return;
      }

      const selIdx = sel ? currentList.indexOf(sel) : -1;
      const savedScroll = preserveScroll ? (pickerScrollMap.get(pickerKey) || 0) : 0;
      const estimatedRowsNeeded = Math.ceil(savedScroll / 80) * 3 + BATCH;
      const initialCount = Math.max(BATCH, selIdx + 24, estimatedRowsNeeded);

      grid.innerHTML = '';
      appendMore(initialCount);
      if (preserveScroll && savedScroll > 0) {
        grid.scrollTop = savedScroll;
      }
    };

    input.addEventListener('input', () => {
      pickerScrollMap.set(pickerKey, 0);
      rebuild(false);
    });

    rebuild(true);

    return {
      rebuild,
      setFolderAndTitle(newFolder, newTitle) {
        if (newFolder) box.dataset.folder = newFolder;
        if (newTitle && titleEl) titleEl.textContent = newTitle;
      },
      syncSelected() {
        const sel = getSelected();
        grid.querySelectorAll('.asset-option').forEach((node) => {
          node.classList.toggle('selected', node.dataset.file === sel);
        });
      },
    };
  }

  // ==================== 右侧编辑器：单人角色铭牌 ====================
  function renderRoleEditor() {
    const r = state.role;
    const tf = currentArtTransform();
    const box = el('roleEditor');
    const prevPanelScroll = panelScrollEl ? panelScrollEl.scrollTop : 0;

    box.innerHTML = `<div class="editor-card">
      <div class="field-inline">
        <div class="field">
          <label for="rolePlayerName">玩家昵称（自定义文本）</label>
          <input id="rolePlayerName" type="text" maxlength="28" value="${esc(r.playerName)}">
        </div>
        <div class="field">
          <label for="roleSkinLabel">皮肤/头衔名（自定义文本）</label>
          <div style="display:flex;gap:5px">
            <input id="roleSkinLabel" type="text" maxlength="36" value="${esc(r.skinLabel)}">
            <input id="roleSkinColor" type="color" value="${esc(r.skinColor || '#78d9ff')}" title="皮肤名颜色">
          </div>
        </div>
      </div>

      ${fontSelectHtml('roleFontSelect', 'roleCustomFont', 'roleFontBar', r.fontKey || 'default', r.customFont, '铭牌文字字体（同步应用至预览与高清导出）')}

      <details class="position-details" id="rolePosDetails"${rolePosOpen ? ' open' : ''}>
        <summary>文字字号、立绘与头像微调（默认已校准，可选展开）</summary>
        <div class="mini-reset-bar">
          <button type="button" class="mini-reset-btn" id="resetRoleArt">↺ 复位立绘</button>
          <button type="button" class="mini-reset-btn" id="resetRoleText">↺ 复位文字</button>
          <button type="button" class="mini-reset-btn" id="resetRoleAvatar">↺ 复位头像</button>
          <button type="button" class="mini-reset-btn" id="resetRoleAllPos">↺ 全部归零复位</button>
          <span class="mini-reset-hint">双击滑块可单条归零</span>
        </div>
        <div class="position-grid">
          <label class="range-field"><span>玩家名字号 <output id="nameFsVal">${r.nameFontSize}px</output></span><input id="nameFs" type="range" min="10" max="27" step="0.5" value="${r.nameFontSize}"></label>
          <label class="range-field"><span>皮肤名字号 <output id="skinFsVal">${r.skinFontSize}px</output></span><input id="skinFs" type="range" min="9" max="24" step="0.5" value="${r.skinFontSize}"></label>
          <label class="range-field"><span>文字水平偏移 X <output id="textOffXVal">${fmtSigned(r.textOffsetX)}</output></span><input id="textOffX" type="range" min="-20" max="15" step="0.5" value="${r.textOffsetX}"></label>
          <label class="range-field"><span>文字垂直偏移 Y <output id="textOffYVal">${fmtSigned(r.textOffsetY)}</output></span><input id="textOffY" type="range" min="-20" max="20" step="0.5" value="${r.textOffsetY}"></label>

          <label class="range-field"><span><b id="artModeLblX">${r.variant === 'full' ? '全身' : '半身'}</b>立绘偏移 X <output id="artXVal">${fmtSigned(tf.x)}</output></span><input id="artX" type="range" min="-45" max="45" step="0.5" value="${tf.x}"></label>
          <label class="range-field"><span><b id="artModeLblY">${r.variant === 'full' ? '全身' : '半身'}</b>立绘偏移 Y <output id="artYVal">${fmtSigned(tf.y)}</output></span><input id="artY" type="range" min="-45" max="45" step="0.5" value="${tf.y}"></label>
          <label class="range-field range-full"><span><b id="artModeLblS">${r.variant === 'full' ? '全身' : '半身'}</b>立绘缩放 <output id="artScaleVal">${tf.scale}%</output></span><input id="artScale" type="range" min="40" max="160" step="1" value="${tf.scale}"></label>

          <label class="range-field"><span>头像水平偏移 X <output id="roleAvXVal">${fmtSigned(r.avatarOffsetX)}</output></span><input id="roleAvX" type="range" min="-15" max="35" step="0.5" value="${r.avatarOffsetX}"></label>
          <label class="range-field"><span>头像垂直偏移 Y <output id="roleAvYVal">${fmtSigned(r.avatarOffsetY)}</output></span><input id="roleAvY" type="range" min="-20" max="20" step="0.5" value="${r.avatarOffsetY}"></label>
          <label class="range-field range-full"><span>头像缩放 <output id="roleAvScaleVal">${r.avatarScale}%</output></span><input id="roleAvScale" type="range" min="50" max="150" step="1" value="${r.avatarScale}"></label>
        </div>
      </details>

      <div class="editor-row-between">
        <label class="switch-label">
          <input id="roleShowBadges" type="checkbox" ${r.showBadges ? 'checked' : ''}>
          左上武器/潜能图标
        </label>
        <div class="trait-select-group">
          <select id="rolePrimaryTrait" class="trait-select" aria-label="主潜能">
            <option value="havoc" ${r.primaryTrait === 'havoc' ? 'selected' : ''}>破坏红</option>
            <option value="chaos" ${r.primaryTrait === 'chaos' ? 'selected' : ''}>混沌紫</option>
            <option value="fort" ${r.primaryTrait === 'fort' ? 'selected' : ''}>抵抗蓝</option>
            <option value="support" ${r.primaryTrait === 'support' ? 'selected' : ''}>支援绿</option>
          </select>
          <select id="roleSubTrait" class="trait-select" aria-label="副潜能">
            <option value="chaos" ${r.subTrait === 'chaos' ? 'selected' : ''}>混沌紫</option>
            <option value="havoc" ${r.subTrait === 'havoc' ? 'selected' : ''}>破坏红</option>
            <option value="fort" ${r.subTrait === 'fort' ? 'selected' : ''}>抵抗蓝</option>
            <option value="support" ${r.subTrait === 'support' ? 'selected' : ''}>支援绿</option>
          </select>
        </div>
      </div>

      ${pickerHtml('1. 选择实验体', '实验体中文/英文名', 'character', FOLDERS.characterPortraits)}

      <div class="field">
        <span class="field-label">2. 切换半身 / 全身皮肤（各自记住缩放与偏移）</span>
        <div class="skin-toggle">
          <button type="button" data-variant="half" class="${r.variant === 'half' ? 'active' : ''}">半身立绘</button>
          <button type="button" data-variant="full" class="${r.variant === 'full' ? 'active' : ''}">全身立绘</button>
        </div>
      </div>
      ${pickerHtml(`${characterDisplayName(r.characterKey)} 皮肤列表`, '皮肤中文名/编号', 'skin', r.variant === 'full' ? FOLDERS.fullSkins : FOLDERS.halfSkins)}
      ${pickerHtml('3. 铭牌边框', '边框中文名/编号', 'border', FOLDERS.borders)}
      ${pickerHtml('4. 人物背景板', '背景中文名/编号', 'roleBackground', FOLDERS.characterBackgrounds)}
      ${pickerHtml('5. 左下角玩家头像', '头像中文名/编号', 'avatar', FOLDERS.avatars)}
    </div>`;

    const posDetails = el('rolePosDetails');
    if (posDetails) posDetails.addEventListener('toggle', () => { rolePosOpen = posDetails.open; });

    el('rolePlayerName').addEventListener('input', (e) => { r.playerName = e.target.value; renderPreview(); });
    el('roleSkinLabel').addEventListener('input', (e) => { r.skinLabel = e.target.value; renderPreview(); });
    el('roleSkinColor').addEventListener('input', (e) => { r.skinColor = e.target.value; renderPreview(); });
    el('roleShowBadges').addEventListener('change', (e) => { r.showBadges = e.target.checked; renderPreview(); });
    el('rolePrimaryTrait').addEventListener('change', (e) => { r.primaryTrait = e.target.value; renderPreview(); });
    el('roleSubTrait').addEventListener('change', (e) => { r.subTrait = e.target.value; renderPreview(); });

    el('roleFontSelect').addEventListener('change', (e) => {
      r.fontKey = e.target.value;
      const isCustom = r.fontKey === 'custom';
      el('roleFontBar').classList.toggle('has-custom', isCustom);
      el('roleCustomFont').hidden = !isCustom;
      if (isCustom) el('roleCustomFont').focus();
      renderPreview();
    });
    el('roleCustomFont').addEventListener('input', (e) => {
      r.customFont = e.target.value;
      renderPreview();
    });

    const syncSliderInputs = () => {
      const curTf = currentArtTransform();
      const modeWord = r.variant === 'full' ? '全身' : '半身';
      el('artModeLblX').textContent = modeWord;
      el('artModeLblY').textContent = modeWord;
      el('artModeLblS').textContent = modeWord;
      el('nameFs').value = r.nameFontSize; el('nameFsVal').textContent = `${r.nameFontSize}px`;
      el('skinFs').value = r.skinFontSize; el('skinFsVal').textContent = `${r.skinFontSize}px`;
      el('textOffX').value = r.textOffsetX; el('textOffXVal').textContent = fmtSigned(r.textOffsetX);
      el('textOffY').value = r.textOffsetY; el('textOffYVal').textContent = fmtSigned(r.textOffsetY);
      el('artX').value = curTf.x; el('artXVal').textContent = fmtSigned(curTf.x);
      el('artY').value = curTf.y; el('artYVal').textContent = fmtSigned(curTf.y);
      el('artScale').value = curTf.scale; el('artScaleVal').textContent = `${curTf.scale}%`;
      el('roleAvX').value = r.avatarOffsetX; el('roleAvXVal').textContent = fmtSigned(r.avatarOffsetX);
      el('roleAvY').value = r.avatarOffsetY; el('roleAvYVal').textContent = fmtSigned(r.avatarOffsetY);
      el('roleAvScale').value = r.avatarScale; el('roleAvScaleVal').textContent = `${r.avatarScale}%`;
    };

    const bindRoleProp = (id, outId, key, min, max, fmt) => {
      const inp = el(id); const out = el(outId);
      inp.title = '双击恢复该项默认值';
      inp.addEventListener('input', () => {
        r[key] = num(inp.value, r[key], min, max);
        out.textContent = fmt(r[key]);
        renderPreview();
      });
      inp.addEventListener('dblclick', () => {
        r[key] = ROLE_DEFAULTS[key];
        inp.value = r[key];
        out.textContent = fmt(r[key]);
        renderPreview();
      });
    };
    bindRoleProp('nameFs', 'nameFsVal', 'nameFontSize', 10, 27, (v) => `${v}px`);
    bindRoleProp('skinFs', 'skinFsVal', 'skinFontSize', 9, 24, (v) => `${v}px`);
    bindRoleProp('textOffX', 'textOffXVal', 'textOffsetX', -20, 15, (v) => fmtSigned(v));
    bindRoleProp('textOffY', 'textOffYVal', 'textOffsetY', -20, 20, (v) => fmtSigned(v));
    bindRoleProp('roleAvX', 'roleAvXVal', 'avatarOffsetX', -15, 35, (v) => fmtSigned(v));
    bindRoleProp('roleAvY', 'roleAvYVal', 'avatarOffsetY', -20, 20, (v) => fmtSigned(v));
    bindRoleProp('roleAvScale', 'roleAvScaleVal', 'avatarScale', 50, 150, (v) => `${v}%`);

    const bindArtTf = (id, outId, key, min, max, fmt) => {
      const inp = el(id); const out = el(outId);
      inp.title = '双击恢复该项默认值';
      inp.addEventListener('input', () => {
        const curTf = currentArtTransform();
        curTf[key] = num(inp.value, curTf[key], min, max);
        out.textContent = fmt(curTf[key]);
        renderPreview();
      });
      inp.addEventListener('dblclick', () => {
        const curTf = currentArtTransform();
        const defTf = r.variant === 'full' ? ROLE_DEFAULTS.fullTransform : ROLE_DEFAULTS.halfTransform;
        curTf[key] = defTf[key];
        inp.value = curTf[key];
        out.textContent = fmt(curTf[key]);
        renderPreview();
      });
    };
    bindArtTf('artX', 'artXVal', 'x', -45, 45, (v) => fmtSigned(v));
    bindArtTf('artY', 'artYVal', 'y', -45, 45, (v) => fmtSigned(v));
    bindArtTf('artScale', 'artScaleVal', 'scale', 40, 160, (v) => `${v}%`);

    el('resetRoleArt').addEventListener('click', () => {
      const defTf = r.variant === 'full' ? ROLE_DEFAULTS.fullTransform : ROLE_DEFAULTS.halfTransform;
      Object.assign(currentArtTransform(), defTf);
      syncSliderInputs();
      renderPreview();
      showToast(`已复位${r.variant === 'full' ? '全身' : '半身'}立绘偏移与缩放`);
    });
    el('resetRoleText').addEventListener('click', () => {
      r.nameFontSize = ROLE_DEFAULTS.nameFontSize;
      r.skinFontSize = ROLE_DEFAULTS.skinFontSize;
      r.textOffsetX = ROLE_DEFAULTS.textOffsetX;
      r.textOffsetY = ROLE_DEFAULTS.textOffsetY;
      syncSliderInputs();
      renderPreview();
      showToast('已复位名字与皮肤标题字号/偏移');
    });
    el('resetRoleAvatar').addEventListener('click', () => {
      r.avatarOffsetX = ROLE_DEFAULTS.avatarOffsetX;
      r.avatarOffsetY = ROLE_DEFAULTS.avatarOffsetY;
      r.avatarScale = ROLE_DEFAULTS.avatarScale;
      syncSliderInputs();
      renderPreview();
      showToast('已复位左下头像偏移与大小');
    });
    el('resetRoleAllPos').addEventListener('click', () => {
      r.halfTransform = { ...ROLE_DEFAULTS.halfTransform };
      r.fullTransform = { ...ROLE_DEFAULTS.fullTransform };
      r.nameFontSize = ROLE_DEFAULTS.nameFontSize;
      r.skinFontSize = ROLE_DEFAULTS.skinFontSize;
      r.textOffsetX = ROLE_DEFAULTS.textOffsetX;
      r.textOffsetY = ROLE_DEFAULTS.textOffsetY;
      r.avatarOffsetX = ROLE_DEFAULTS.avatarOffsetX;
      r.avatarOffsetY = ROLE_DEFAULTS.avatarOffsetY;
      r.avatarScale = ROLE_DEFAULTS.avatarScale;
      syncSliderInputs();
      renderPreview();
      showToast('已将全部立绘/文字/头像恢复至实机默认原点（保留所选装扮）');
    });

    const skinPickerCtrl = mountPicker(
      box,
      'skin',
      () => skinsFor(r.characterKey, r.variant),
      () => r.skin,
      (file) => {
        r.skin = file;
        r[r.variant === 'full' ? 'fullSkin' : 'halfSkin'] = file;
        r.skinLabel = displaySkinTitle(r.characterKey, file, r.variant);
        el('roleSkinLabel').value = r.skinLabel;
        renderPreview();
      }
    );

    box.querySelectorAll('[data-variant]').forEach((btn) =>
      btn.addEventListener('click', () => {
        r.variant = btn.dataset.variant;
        box.querySelectorAll('[data-variant]').forEach((b) => b.classList.toggle('active', b.dataset.variant === r.variant));
        r.skin = r.variant === 'full' ? r.fullSkin : r.halfSkin;
        if (!r.skin) r.skin = skinsFor(r.characterKey, r.variant)[0] || '';
        r.skinLabel = displaySkinTitle(r.characterKey, r.skin, r.variant);
        el('roleSkinLabel').value = r.skinLabel;
        syncSliderInputs();
        if (skinPickerCtrl) {
          skinPickerCtrl.setFolderAndTitle(
            r.variant === 'full' ? FOLDERS.fullSkins : FOLDERS.halfSkins,
            `${characterDisplayName(r.characterKey)} 皮肤列表`
          );
          pickerScrollMap.set('role:skin', 0);
          skinPickerCtrl.rebuild(false);
        }
        renderPreview();
      })
    );

    mountPicker(box, 'character', basePortraits, () => r.character, (file) => {
      r.character = file;
      r.characterKey = characterForPortrait(file);
      r.halfSkin = findAsset(skinsFor(r.characterKey, 'half'), isDefaultSkinFile);
      r.fullSkin = findAsset(skinsFor(r.characterKey, 'full'), isDefaultSkinFile);
      r.skin = r.variant === 'full' ? r.fullSkin : r.halfSkin;
      r.skinLabel = displaySkinTitle(r.characterKey, r.skin, r.variant);
      el('roleSkinLabel').value = r.skinLabel;
      if (skinPickerCtrl) {
        skinPickerCtrl.setFolderAndTitle(
          r.variant === 'full' ? FOLDERS.fullSkins : FOLDERS.halfSkins,
          `${characterDisplayName(r.characterKey)} 皮肤列表`
        );
        pickerScrollMap.set('role:skin', 0);
        skinPickerCtrl.rebuild(false);
      }
      renderPreview();
    });

    mountPicker(box, 'border', ASSET.borders, () => r.border, (file) => { r.border = file; renderPreview(); });
    mountPicker(box, 'roleBackground', ASSET.characterBackgrounds, () => r.background, (file) => { r.background = file; renderPreview(); });
    mountPicker(box, 'avatar', ASSET.avatars, () => r.avatar, (file) => { r.avatar = file; renderPreview(); });

    if (panelScrollEl && prevPanelScroll > 0) {
      panelScrollEl.scrollTop = prevPanelScroll;
    }
  }

  // ==================== 右侧编辑器：队伍大厅 ====================
  function renderTeamEditor() {
    const prevPanelScroll = panelScrollEl ? panelScrollEl.scrollTop : 0;
    const tabs = el('teamSlotTabs');
    tabs.innerHTML = state.teamSlots
      .map((s, i) => `<button type="button" class="slot-tab${state.selectedTeamSlot === i ? ' active' : ''}${s.enabled ? ' enabled' : ''}" data-idx="${i}">号位 0${i + 1}</button>`)
      .join('');
    tabs.querySelectorAll('.slot-tab').forEach((b) =>
      b.addEventListener('click', () => {
        state.selectedTeamSlot = Number(b.dataset.idx);
        renderTeamEditor();
        renderPreview();
      })
    );

    const activeCount = state.teamSlots.filter((s) => s.enabled).length;
    el('teamCount').textContent = `0${activeCount}/04`;

    const slot = state.teamSlots[state.selectedTeamSlot];
    const minW = num(slot.nameMinWidth, TEAM_SLOT_DEFAULTS.nameMinWidth, 18, 75);
    const box = el('teamEditor');
    box.innerHTML = `<div class="editor-card">
      <div class="editor-row-between">
        <label class="switch-label"><input id="teamSlotEnabled" type="checkbox" ${slot.enabled ? 'checked' : ''}> 启用该队友槽位</label>
        <label class="switch-label"><input id="teamShowClosed" type="checkbox" ${state.showClosedTeamSlots ? 'checked' : ''}> 显示未启用空槽</label>
      </div>
      <div class="field-inline">
        <div class="field"><label for="teamName">玩家昵称</label><input id="teamName" type="text" maxlength="24" value="${esc(slot.name)}"></div>
        <div class="field">
          <label for="teamStatus">左上角状态字</label>
          <select id="teamStatus">
            <option value="大厅" ${slot.statusText === '大厅' ? 'selected' : ''}>■ 大厅（绿）</option>
            <option value="正在确认结果" ${slot.statusText === '正在确认结果' ? 'selected' : ''}>■ 正在确认结果（蓝）</option>
            <option value="" ${slot.statusText === '' ? 'selected' : ''}>隐藏状态字</option>
          </select>
        </div>
      </div>

      ${fontSelectHtml('teamFontSelect', 'teamCustomFont', 'teamFontBar', state.teamFontKey || 'default', state.teamCustomFont, '全队名字牌字体（统一应用至全队与导出图）')}

      <details class="position-details" id="teamPosDetails"${teamPosOpen ? ' open' : ''}>
        <summary>名字字号/底框宽透 &amp; 头像位置微调（默认已对称校准，可选展开）</summary>
        <div class="mini-reset-bar">
          <button type="button" class="mini-reset-btn" id="resetTeamSlotPos">↺ 复位本槽坐标</button>
          <button type="button" class="mini-reset-btn" id="syncTeamPosAll">⇄ 同步本槽坐标到全队</button>
          <span class="mini-reset-hint">双击滑块可单条归零</span>
        </div>
        <div class="position-grid">
          <label class="range-field"><span>名字字号 <output id="tNameFsVal">${slot.nameFontSize}px</output></span><input id="tNameFs" type="range" min="10" max="24" step="0.5" value="${slot.nameFontSize}"></label>
          <label class="range-field"><span>底条不透明度 <output id="tNameOpVal">${slot.nameBgOpacity}%</output></span><input id="tNameOp" type="range" min="0" max="95" step="1" value="${slot.nameBgOpacity}"></label>
          <label class="range-field range-full"><span>名字牌最小宽度 <output id="tNameMinWVal">${minW}%</output></span><input id="tNameMinW" type="range" min="18" max="75" step="0.5" value="${minW}"></label>
          <label class="range-field"><span>名字水平偏移 X <output id="tNameXVal">${fmtSigned(slot.nameOffsetX)}</output></span><input id="tNameX" type="range" min="-30" max="30" step="0.2" value="${slot.nameOffsetX}"></label>
          <label class="range-field"><span>名字垂直偏移 Y <output id="tNameOffVal">${fmtSigned(slot.nameOffsetY)}</output></span><input id="tNameOff" type="range" min="-10" max="15" step="0.2" value="${slot.nameOffsetY}"></label>

          <label class="range-field"><span>头像水平偏移 X <output id="tAvXVal">${fmtSigned(slot.avatarOffsetX)}</output></span><input id="tAvX" type="range" min="-30" max="30" step="0.2" value="${slot.avatarOffsetX}"></label>
          <label class="range-field"><span>头像垂直偏移 Y <output id="tAvYVal">${fmtSigned(slot.avatarOffsetY)}</output></span><input id="tAvY" type="range" min="-25" max="25" step="0.2" value="${slot.avatarOffsetY}"></label>
          <label class="range-field range-full"><span>头像缩放 <output id="tAvSVal">${slot.avatarScale}%</output></span><input id="tAvS" type="range" min="50" max="150" step="1" value="${slot.avatarScale}"></label>
        </div>
      </details>
      ${pickerHtml('队伍格背景', '队伍背景中文名/编号', 'background', FOLDERS.teamBackgrounds)}
      ${pickerHtml('玩家头像', '头像中文名/编号', 'avatar', FOLDERS.avatars)}
    </div>`;

    const posDetails = el('teamPosDetails');
    if (posDetails) posDetails.addEventListener('toggle', () => { teamPosOpen = posDetails.open; });

    el('teamSlotEnabled').addEventListener('change', (e) => {
      slot.enabled = e.target.checked;
      const curTab = tabs.querySelector(`[data-idx="${state.selectedTeamSlot}"]`);
      if (curTab) curTab.classList.toggle('enabled', slot.enabled);
      const cnt = state.teamSlots.filter((s) => s.enabled).length;
      el('teamCount').textContent = `0${cnt}/04`;
      renderPreview();
    });
    el('teamShowClosed').addEventListener('change', (e) => { state.showClosedTeamSlots = e.target.checked; renderPreview(); });
    el('teamName').addEventListener('input', (e) => { slot.name = e.target.value; renderPreview(); });
    el('teamStatus').addEventListener('change', (e) => {
      slot.statusText = e.target.value;
      slot.statusBusy = slot.statusText === '正在确认结果';
      renderPreview();
    });

    el('teamFontSelect').addEventListener('change', (e) => {
      state.teamFontKey = e.target.value;
      const isCustom = state.teamFontKey === 'custom';
      el('teamFontBar').classList.toggle('has-custom', isCustom);
      el('teamCustomFont').hidden = !isCustom;
      if (isCustom) el('teamCustomFont').focus();
      renderPreview();
    });
    el('teamCustomFont').addEventListener('input', (e) => {
      state.teamCustomFont = e.target.value;
      renderPreview();
    });

    const syncTeamSliders = () => {
      el('tNameFs').value = slot.nameFontSize; el('tNameFsVal').textContent = `${slot.nameFontSize}px`;
      el('tNameOp').value = slot.nameBgOpacity; el('tNameOpVal').textContent = `${slot.nameBgOpacity}%`;
      el('tNameMinW').value = slot.nameMinWidth; el('tNameMinWVal').textContent = `${slot.nameMinWidth}%`;
      el('tNameX').value = slot.nameOffsetX; el('tNameXVal').textContent = fmtSigned(slot.nameOffsetX);
      el('tNameOff').value = slot.nameOffsetY; el('tNameOffVal').textContent = fmtSigned(slot.nameOffsetY);
      el('tAvX').value = slot.avatarOffsetX; el('tAvXVal').textContent = fmtSigned(slot.avatarOffsetX);
      el('tAvY').value = slot.avatarOffsetY; el('tAvYVal').textContent = fmtSigned(slot.avatarOffsetY);
      el('tAvS').value = slot.avatarScale; el('tAvSVal').textContent = `${slot.avatarScale}%`;
    };

    const bind = (id, outId, key, min, max, fmt) => {
      const inp = el(id); const out = el(outId);
      inp.title = '双击恢复该项默认值';
      inp.addEventListener('input', () => {
        slot[key] = num(inp.value, slot[key], min, max);
        out.textContent = fmt(slot[key]);
        renderPreview();
      });
      inp.addEventListener('dblclick', () => {
        slot[key] = TEAM_SLOT_DEFAULTS[key];
        inp.value = slot[key];
        out.textContent = fmt(slot[key]);
        renderPreview();
      });
    };
    bind('tNameFs', 'tNameFsVal', 'nameFontSize', 10, 24, (v) => `${v}px`);
    bind('tNameOp', 'tNameOpVal', 'nameBgOpacity', 0, 95, (v) => `${v}%`);
    bind('tNameMinW', 'tNameMinWVal', 'nameMinWidth', 18, 75, (v) => `${v}%`);
    bind('tNameX', 'tNameXVal', 'nameOffsetX', -30, 30, (v) => fmtSigned(v));
    bind('tNameOff', 'tNameOffVal', 'nameOffsetY', -10, 15, (v) => fmtSigned(v));
    bind('tAvX', 'tAvXVal', 'avatarOffsetX', -30, 30, (v) => fmtSigned(v));
    bind('tAvY', 'tAvYVal', 'avatarOffsetY', -25, 25, (v) => fmtSigned(v));
    bind('tAvS', 'tAvSVal', 'avatarScale', 50, 150, (v) => `${v}%`);

    el('resetTeamSlotPos').addEventListener('click', () => {
      Object.assign(slot, TEAM_SLOT_DEFAULTS);
      syncTeamSliders();
      renderPreview();
      showToast(`号位 0${state.selectedTeamSlot + 1} 坐标已恢复默认对称校准（保留背景与头像）`);
    });
    el('syncTeamPosAll').addEventListener('click', () => {
      const keys = Object.keys(TEAM_SLOT_DEFAULTS);
      state.teamSlots.forEach((s) => {
        keys.forEach((k) => { s[k] = slot[k]; });
      });
      renderPreview();
      showToast('已将当前号位的头像与名字牌尺寸/坐标同步到全队');
    });

    mountPicker(box, 'background', ASSET.teamBackgrounds, () => slot.background, (f) => { slot.background = f; renderPreview(); });
    mountPicker(box, 'avatar', ASSET.avatars, () => slot.avatar, (f) => { slot.avatar = f; renderPreview(); });

    if (panelScrollEl && prevPanelScroll > 0) {
      panelScrollEl.scrollTop = prevPanelScroll;
    }
  }

  // ==================== 左侧画布直接拖拽移动立绘 + 滚轮缩放立绘 ====================
  let dragCtx = null;
  function bindRoleCanvasGesture(cardEl) {
    if (!cardEl) return;
    cardEl.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const tf = currentArtTransform();
      dragCtx = { startX: e.clientX, startY: e.clientY, origX: tf.x, origY: tf.y };
    });
    cardEl.addEventListener('wheel', (e) => {
      e.preventDefault();
      const tf = currentArtTransform();
      const delta = e.deltaY < 0 ? 3 : -3;
      tf.scale = clamp(tf.scale + delta, 40, 160);
      const sInp = el('artScale'); const sOut = el('artScaleVal');
      if (sInp && sOut) { sInp.value = tf.scale; sOut.textContent = `${tf.scale}%`; }
      renderPreview();
    }, { passive: false });
  }

  window.addEventListener('mousemove', (e) => {
    if (!dragCtx || state.mode !== 'role') return;
    const tf = currentArtTransform();
    const dxPct = ((e.clientX - dragCtx.startX) / 306) * 100;
    const dyPct = ((e.clientY - dragCtx.startY) / 560) * 100;
    tf.x = Math.round(clamp(dragCtx.origX + dxPct, -45, 45) * 2) / 2;
    tf.y = Math.round(clamp(dragCtx.origY + dyPct, -45, 45) * 2) / 2;
    if (el('artX')) { el('artX').value = tf.x; el('artXVal').textContent = fmtSigned(tf.x); }
    if (el('artY')) { el('artY').value = tf.y; el('artYVal').textContent = fmtSigned(tf.y); }
    renderPreview();
  });
  window.addEventListener('mouseup', () => { dragCtx = null; });

  // ==================== 实时预览渲染 ====================
  function renderPreview() {
    const grid = el('previewGrid');
    const isRole = state.mode === 'role';
    grid.className = `preview-grid ${isRole ? 'is-role-mode' : 'is-team-mode'}`;

    if (isRole) {
      const r = state.role;
      const m = computeRoleMetrics(r);
      const roleFont = resolveFontFamily(r.fontKey, r.customFont);
      const skinFolder = r.variant === 'full' ? FOLDERS.fullSkins : FOLDERS.halfSkins;
      const bgFitStyle = USE_EXTRACTED ? '' : 'object-fit:cover;';
      const borderFitStyle = USE_EXTRACTED ? '' : 'object-fit:contain;';

      const availH = Math.max(320, (el('previewStage')?.clientHeight || 600) - 32);
      const stageScale = Math.min(1.08, availH / 560).toFixed(3);

      grid.innerHTML = `<article class="role-plate-card" id="rolePlateCard" style="transform:scale(${stageScale})">
        <div class="role-plate-inner">
          ${r.background ? `<img class="role-bg-img" style="${bgFitStyle}" src="${assetPath(FOLDERS.characterBackgrounds, r.background)}" alt="">` : ''}
          ${r.skin ? `<div class="role-skin-clip"><img class="role-skin-img" style="left:${m.artX.toFixed(2)}%;top:${m.artY.toFixed(2)}%;width:${m.artWidth.toFixed(2)}%" src="${assetPath(skinFolder, r.skin)}" alt=""></div>` : ''}
          ${!r.border ? '<div class="role-nameplate-bar"></div>' : ''}
        </div>
        ${r.showBadges ? `<div class="role-side-badges">
          <span class="role-badge-weapon">⚔</span>
          <span class="role-badge-trait ${esc(r.primaryTrait)}"></span>
          <span class="role-badge-trait ${esc(r.subTrait)}"></span>
        </div>` : ''}
        ${r.border ? `<img class="role-border-img" style="${borderFitStyle}" src="${assetPath(FOLDERS.borders, r.border)}" alt="">` : ''}
        ${r.avatar ? `<img class="role-player-avatar" style="left:${m.avatarX.toFixed(2)}%;top:${m.avatarY.toFixed(2)}%;width:${m.avatarWidth.toFixed(2)}%" src="${assetPath(FOLDERS.avatars, r.avatar)}" alt="">` : ''}
        <div class="role-text-group" style="right:${m.textRight.toFixed(2)}%;top:${m.textY.toFixed(2)}%;font-family:${esc(roleFont)}">
          <span class="role-skin-title" style="color:${esc(r.skinColor || '#78d9ff')};font-size:${r.skinFontSize}px">${esc(r.skinLabel)}</span>
          <strong class="role-player-name" style="font-size:${r.nameFontSize}px">${esc(r.playerName)}</strong>
        </div>
      </article>`;

      bindRoleCanvasGesture(el('rolePlateCard'));
      el('previewEyebrow').textContent = '单人角色加载界面';
      el('previewTitle').textContent = '角色加载铭牌（可直接拖拽/滚轮缩放立绘）';
      el('slotSummary').textContent = r.variant === 'full' ? '全身模式' : '半身模式';
    } else {
      const teamFont = resolveFontFamily(state.teamFontKey, state.teamCustomFont);
      const slotsToRender = state.showClosedTeamSlots ? state.teamSlots : state.teamSlots.filter((s) => s.enabled);
      grid.innerHTML = slotsToRender
        .map((s) => {
          if (!s.enabled) {
            return `<article class="team-lobby-slot is-closed"><span class="closed-watermark">空槽位</span></article>`;
          }
          const tm = computeTeamMetrics(s);
          const bgAlpha = (num(s.nameBgOpacity, TEAM_SLOT_DEFAULTS.nameBgOpacity, 0, 95) / 100).toFixed(2);

          return `<article class="team-lobby-slot">
            ${s.background ? `<img class="team-bg-img" src="${assetPath(FOLDERS.teamBackgrounds, s.background)}" alt="">` : ''}
            ${s.statusText ? `<span class="team-status-tag${s.statusBusy ? ' busy' : ''}" style="font-family:${esc(teamFont)}">${esc(s.statusText)}</span>` : ''}
            ${s.avatar ? `<div class="team-avatar-box" style="left:${tm.avX.toFixed(2)}%;top:${tm.avY.toFixed(2)}%;width:${tm.avWidthPct.toFixed(2)}%"><img src="${assetPath(FOLDERS.avatars, s.avatar)}" alt=""></div>` : ''}
            <div class="team-name-tag" style="left:${tm.nameX.toFixed(2)}%;top:${tm.nameCenterY.toFixed(2)}%;min-width:${tm.nameMinWidth.toFixed(1)}%;font-size:${s.nameFontSize}px;font-family:${esc(teamFont)};background:rgba(16,21,27,${bgAlpha})"><span>${esc(s.name || '玩家')}</span></div>
          </article>`;
        })
        .join('');

      const enabledCount = state.teamSlots.filter((s) => s.enabled).length;
      el('previewEyebrow').textContent = '组队大厅 · 一至四人队列';
      el('previewTitle').textContent = '队伍大厅';
      el('slotSummary').textContent = `${enabledCount} / 4 已启用`;
    }
    persist();
  }

  function renderControls() {
    const isRole = state.mode === 'role';
    el('rolePanel').hidden = !isRole;
    el('teamPanel').hidden = isRole;
    document.querySelectorAll('.mode-tab').forEach((b) => b.classList.toggle('active', b.dataset.mode === state.mode));
    if (isRole) renderRoleEditor();
    else renderTeamEditor();
    const total = Object.values(ASSET).reduce((acc, arr) => acc + arr.length, 0);
    el('assetCount').textContent = `${total.toLocaleString()} 项素材${USE_EXTRACTED ? ' · 原名索引' : ' · 旧库'}`;
  }

  // ==================== 1:1 高清导出 PNG（严格按所选字体、规整底框与 2 倍超采样映射） ====================
  function loadImg(src) {
    if (!src) return Promise.resolve(null);
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function drawCover(ctx, img, x, y, w, h) {
    if (!img) return;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  }

  function drawContain(ctx, img, x, y, w, h) {
    if (!img) return;
    const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  }

  function fillRoundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.rect(x, y, w, h);
    }
    ctx.fill();
  }

  const TRAIT_COLORS = {
    havoc: ['#ef4444', '#450a0a'],
    chaos: ['#c084fc', '#3b0764'],
    fort: ['#38bdf8', '#082f49'],
    support: ['#4ade80', '#052e16'],
  };

  function drawTraitCircle(ctx, cx, cy, radius, traitKey) {
    const [inner, outer] = TRAIT_COLORS[traitKey] || TRAIT_COLORS.havoc;
    const g = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.stroke();
    ctx.restore();
  }

  async function exportPng() {
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch {}
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (state.mode === 'role') {
      const SCALE = 2;
      const W = 306 * SCALE;
      const H = 560 * SCALE;
      canvas.width = W;
      canvas.height = H;

      const r = state.role;
      const m = computeRoleMetrics(r);
      const roleFont = resolveFontFamily(r.fontKey, r.customFont);
      const skinFolder = r.variant === 'full' ? FOLDERS.fullSkins : FOLDERS.halfSkins;
      const [bg, skin, avatar, border] = await Promise.all([
        loadImg(assetPath(FOLDERS.characterBackgrounds, r.background)),
        loadImg(assetPath(skinFolder, r.skin)),
        loadImg(assetPath(FOLDERS.avatars, r.avatar)),
        loadImg(assetPath(FOLDERS.borders, r.border)),
      ]);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(W * 0.1036, H * 0.1094);
      ctx.lineTo(W * 0.9179, H * 0.0039);
      ctx.lineTo(W * 0.9179, H * 0.8594);
      ctx.lineTo(W * 0.1036, H * 0.9648);
      ctx.closePath();
      ctx.clip();

      ctx.fillStyle = '#141920';
      ctx.fillRect(0, 0, W, H);
      if (bg) {
        if (USE_EXTRACTED) ctx.drawImage(bg, 0, 0, W, H);
        else drawCover(ctx, bg, 0, 0, W, H);
      }

      if (skin) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, H * 0.74);
        ctx.clip();
        const targetW = W * (m.artWidth / 100);
        const targetH = targetW * (skin.naturalHeight / skin.naturalWidth);
        const cx = W * (m.artX / 100);
        const cy = H * (m.artY / 100);
        ctx.drawImage(skin, cx - targetW / 2, cy - targetH / 2, targetW, targetH);
        ctx.restore();
      }

      if (!border) {
        const barH = H * 0.303;
        const barY = H - barH;
        const grad = ctx.createLinearGradient(0, barY, 0, H);
        grad.addColorStop(0, 'rgba(14,18,23,0.94)');
        grad.addColorStop(1, 'rgba(8,10,14,0.98)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, barY, W, barH);
      }
      ctx.restore();

      if (r.showBadges) {
        const bx = W * 0.142 + 12 * SCALE;
        const by = H * 0.138;
        ctx.save();
        ctx.font = `${13 * SCALE}px "Segoe UI", sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⚔', bx, by + 10 * SCALE);
        ctx.restore();
        drawTraitCircle(ctx, bx, by + 38 * SCALE, 12 * SCALE, r.primaryTrait);
        drawTraitCircle(ctx, bx, by + 68 * SCALE, 12 * SCALE, r.subTrait);
      }

      if (border) {
        if (USE_EXTRACTED) ctx.drawImage(border, 0, 0, W, H);
        else drawContain(ctx, border, 0, 0, W, H);
      }

      if (avatar) {
        const avSize = W * (m.avatarWidth / 100);
        const avX = W * (m.avatarX / 100) - avSize / 2;
        const avY = H * (m.avatarY / 100) - avSize / 2;
        ctx.fillStyle = '#0f1318';
        ctx.fillRect(avX, avY, avSize, avSize);
        drawCover(ctx, avatar, avX, avY, avSize, avSize);
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(avX, avY, avSize, avSize);
      }

      const textRightX = W * (1 - m.textRight / 100);
      const centerY = H * (m.textY / 100);
      const skinPx = r.skinFontSize * SCALE;
      const namePx = r.nameFontSize * SCALE;

      ctx.save();
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0,0,0,0.95)';
      ctx.shadowBlur = 8;
      ctx.font = `700 ${skinPx}px ${roleFont}`;
      ctx.fillStyle = r.skinColor || '#78d9ff';
      ctx.fillText(r.skinLabel || '', textRightX, centerY - namePx * 0.58);

      ctx.font = `800 ${namePx}px ${roleFont}`;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(r.playerName || '', textRightX, centerY + skinPx * 0.62);
      ctx.restore();
    } else {
      const slots = state.teamSlots.filter((s) => s.enabled);
      if (!slots.length) { showToast('请至少启用 1 个队伍槽位'); return; }
      const teamFont = resolveFontFamily(state.teamFontKey, state.teamCustomFont);
      const SCALE = 1.4;
      const sw = Math.round(282 * SCALE);
      const sh = Math.round(643 * SCALE);
      const gap = 11;
      canvas.width = slots.length * sw + (slots.length - 1) * gap;
      canvas.height = sh;

      for (let i = 0; i < slots.length; i += 1) {
        const s = slots[i];
        const tm = computeTeamMetrics(s);
        const ox = i * (sw + gap);
        const [bg, av] = await Promise.all([
          loadImg(assetPath(FOLDERS.teamBackgrounds, s.background)),
          loadImg(assetPath(FOLDERS.avatars, s.avatar)),
        ]);
        if (bg) {
          const sx = bg.naturalWidth * (8 / 322);
          const sWidth = bg.naturalWidth * (282 / 322);
          const sHeight = bg.naturalHeight * (643 / 684);
          ctx.drawImage(bg, sx, 0, sWidth, sHeight, ox, 0, sw, sh);
        }

        if (s.statusText) {
          const stColor = s.statusBusy ? '#38bdf8' : '#65f77b';
          ctx.fillStyle = stColor;
          ctx.fillRect(ox + sw * 0.045, sh * 0.034, 8, 8);
          ctx.font = `700 ${Math.round(11.5 * SCALE)}px ${teamFont}`;
          ctx.textBaseline = 'top';
          ctx.textAlign = 'left';
          ctx.fillText(s.statusText, ox + sw * 0.045 + 13, sh * 0.031);
        }

        const avSize = sw * (tm.avWidthPct / 100);
        const cx = ox + sw * (tm.avX / 100);
        const cy = sh * (tm.avY / 100);
        if (av) drawCover(ctx, av, cx - avSize / 2, cy - avSize / 2, avSize, avSize);

        const label = s.name || 'PLAYER';
        const fontPx = Math.round(s.nameFontSize * SCALE);
        ctx.font = `700 ${fontPx}px ${teamFont}`;
        const padX = Math.round(11 * SCALE);
        const boxH = Math.max(Math.round(sh * 0.048), Math.round(fontPx * 1.65));
        const minBoxW = sw * (tm.nameMinWidth / 100);
        const boxW = Math.min(sw * 0.88, Math.max(minBoxW, ctx.measureText(label).width + padX * 2));

        const nameCenterY = sh * (tm.nameCenterY / 100);
        const nameCenterX = ox + sw * (tm.nameX / 100);
        const alpha = num(s.nameBgOpacity, TEAM_SLOT_DEFAULTS.nameBgOpacity, 0, 95) / 100;

        ctx.fillStyle = `rgba(16,21,27,${alpha})`;
        fillRoundRect(ctx, nameCenterX - boxW / 2, nameCenterY - boxH / 2, boxW, boxH, Math.round(2 * SCALE));

        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.88)';
        ctx.shadowBlur = 4;
        ctx.fillText(label, nameCenterX, nameCenterY);
        ctx.restore();
      }
    }

    canvas.toBlob((blob) => {
      const a = document.createElement('a');
      a.download = `卢米亚铭牌工坊-${state.mode === 'role' ? '角色铭牌' : '队伍大厅'}.png`;
      a.href = URL.createObjectURL(blob);
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      showToast('高清 PNG 已导出');
    }, 'image/png');
  }

  function syncThemeBtn() {
    const btn = el('themeToggle');
    if (!btn) return;
    btn.textContent = state.theme === 'light' ? '☾' : '☀';
    btn.title = state.theme === 'light' ? '切换为夜间深色界面' : '切换为日间浅色界面';
  }

  document.querySelectorAll('.mode-tab').forEach((b) =>
    b.addEventListener('click', () => {
      state.mode = b.dataset.mode;
      renderControls();
      renderPreview();
    })
  );
  el('themeToggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = state.theme;
    localStorage.setItem(THEME_KEY, state.theme);
    syncThemeBtn();
  });
  el('resetButton').addEventListener('click', () => {
    if (state.mode === 'role') state.role = makeRoleConfig();
    else state.teamSlots = [makeTeamSlot(true, 0), makeTeamSlot(true, 1), makeTeamSlot(true, 2), makeTeamSlot(false, 3)];
    renderControls();
    renderPreview();
    showToast('已恢复默认校准参数');
  });
  el('exportButton').addEventListener('click', exportPng);
  window.addEventListener('resize', () => { if (state.mode === 'role') renderPreview(); });
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, select')) return;
    if (e.key === '1') { state.mode = 'role'; renderControls(); renderPreview(); }
    if (e.key === '2') { state.mode = 'team'; renderControls(); renderPreview(); }
  });

  document.body.dataset.theme = state.theme;
  syncThemeBtn();
  renderControls();
  renderPreview();
})();
