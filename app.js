(function () {
  'use strict';

  const APP_VERSION = '1.2.0';
  const FALLBACK_CHANGELOG = [
    {
      version: '1.2.0',
      date: '2026-11-25',
      items: [
        '实装游戏包原生解包「23 种全武器图标 + 16 枚现役核心潜能 + 4 大副系潜能组」高清贴图，切换实验体自动匹配本命武器并支持自由混搭',
        '新增模式「02 · 加载连排（三人小队）」：1:1 复刻正式加载界面 3 人铭牌紧凑并排与 01～08 队标高亮，支持直接点选/拖拽任意队员立绘、高清透明导出与三人搭配清单图',
        '新增「★ 我的收藏夹」：支持将调好的角色铭牌一键存入浏览器本地衣柜，可随时载入单人铭牌或一键填入三人连排任意号位，支持覆盖、改名与删除',
        '修复「◎ 定位」按钮计算偏移导致跳到底部的问题（现可精准居中定位到当前实验体/装扮），优化边框 4 列高视窗丝滑滚轮手感，并按需精简筛选标签为「全部 / 电竞战队包」与「排位/比赛/掉宝」',
      ],
    },
    {
      version: '1.1.6',
      date: '2026-11-25',
      items: [
        '界面视觉全面焕新：毛玻璃顶栏、现代胶囊拨杆开关、定制圆环滑块、暗色渐变缩略图底槽与选中项右上角「✓」角标',
        '新增「当前已选装扮速览条」：实时展示实验体/皮肤、边框、背景、头像缩略图与名称，点击任一卡片即可平滑定位至对应素材区',
        '素材库新增「电竞战队 / 排位冠军 / 联动限定 / 兔女郎女仆 / 周年节日」一键分类筛选胶囊与「◎ 定位已选」快捷按钮',
        '预览区新增「默认 / 暗场 / 纯白 / 透明格」4 种舞台底衬独立切换，头衔名新增 6 枚实机常用预设色点，并上线「✦ 随机搭配」灵感按钮',
      ],
    },
    {
      version: '1.1.5',
      date: '2026-11-25',
      items: [
        '精准校准全部 150 张队伍大厅背景逐图边缘裁切框（消除部分 S11/三周年/皮肤背景顶部 4～6px 与左侧 2px 残留黑边），并为半透明「默认队伍格背景」补齐深色底衬',
        '补全最后 18 枚早期排位段位标志中文名，全库 2,740 项素材中文命中率达 100.0%',
        '角色铭牌左上武器图标升级为纯白矢量双剑（修复手机 iOS/Android 变成彩色 Emoji ⚔️ 的问题），新增「左下头像」显隐开关与超长皮肤名自动缩字防撞头像机制',
        '队伍大厅支持直接点击预览卡片秒切编辑号位，并补齐导出图立绘/头像立体阴影与离屏解码缓存加速',
      ],
    },
    {
      version: '1.1.4',
      date: '2026-11-25',
      items: [
        '全面完成手机端 UI 响应式适配：双行紧凑顶栏、防 iOS 输入框自动放大、单列大触控滑块、底部全面屏安全区留白及「放大预览 / 恢复分屏」一键切换',
        '角色铭牌与队伍大厅双模式实装等比自适应画布缩放盒，4 人队伍大厅在手机竖屏下亦可完整同屏等比预览、字号零变形',
        '角色铭牌新增手机端单指拖拽移动立绘、双指捏合缩放立绘（120fps 原位丝滑更新），并兼容微信/QQ 内置浏览器长按保存高清原图与搭配分享图',
      ],
    },
    {
      version: '1.1.3',
      date: '2026-11-25',
      items: [
        '修复「✦ 生成搭配图」时左侧角色铭牌 / 上方队伍大厅因 Canvas 宽高属性读取兼容问题未绘制导致显示空白的 Bug，并放大右侧边框缩略图细节局部',
      ],
    },
    {
      version: '1.1.2',
      date: '2026-11-25',
      items: [
        '新增「✦ 生成搭配图」一键分享功能：支持将当前角色铭牌或队伍大厅合成为带缩略图与官方中文名称清单（实验体/皮肤、铭牌边框、背景板、玩家头像、字体及潜能参数）的高清搭配分享卡',
        '搭配分享图弹窗支持「清爽白卡 / 深邃黑卡」双底色实时切换，并支持一键复制分享图到 QQ/微信剪贴板或下载 PNG',
      ],
    },
    {
      version: '1.1.1',
      date: '2026-11-25',
      items: [
        '修复单人角色半身与全身立绘默认中心点偏低导致人物下沉「凹进去」及左肩露边的问题（半身校准至 Y=38.0%、宽 96.0%，全身校准至 Y=42.0%、宽 84.0%），恢复挺拔饱满实机站位',
        '修复角色微调面板中「半身立绘偏移 / 半身立绘缩放」标题文字被两端对齐撑开间距的排版问题',
      ],
    },
    {
      version: '1.1.0',
      date: '2026-11-25',
      items: [
        '修复导出高清 PNG 时角色半身立绘与右下双行文字相对预览下移错位的问题，预览与导出实现 1:1 零误差重合',
        '角色半身立绘默认缩放调整为约 90% 黄金比例（宽 94%、高 46%），彻底消除窄立绘右侧露边问题',
        '初始默认选中实验体切换为「俞岷」',
        '队伍大厅新增常驻「名字字号 + 一键同步字号到全队」快捷栏，调好一个号位即可秒同步全队字号',
        '新增顶栏版本号与「更新日志」弹窗，并实装 version.json 自动版本检测与免手动清缓存无感刷新机制',
      ],
    },
    {
      version: '1.0.3',
      date: '2026-11-25',
      items: [
        '修复外网字体阻塞导致导出卡顿问题，新增顶栏「复制图片」一键写入系统剪贴板功能',
        '定名「卢米亚铭牌工坊」，全量 2,740 项素材无损透明转码为高画质 WebP 并上线 Cloudflare Pages',
      ],
    },
    {
      version: '1.0.2',
      date: '2026-11-25',
      items: [
        '角色铭牌与队伍大厅双模式新增 11 款预设中韩电竞/书法字体及自定义本机字体支持',
        '按 S5 · DAEJEON CYBERS 与 S11 · CNJ 官方凹槽校准队伍名字牌对称中轴（X=50.0%, Y=52.3%, 统一最小宽度 38.6%）',
        '修复点选实验体/头像/边框时列表滚动条回顶问题，改为原位高亮与流式续载',
      ],
    },
    {
      version: '1.0.1',
      date: '2026-11-24',
      items: [
        '重导出全部 296 款边框与 297 张人物背景至 Unity 原生 280×512 满画布，根治半截框与异形边框错位，剔除特效散件',
        '默认主题切换为清爽日间模式，修复潜能下拉框文字裁切，微调面板默认收起并将滑块设为 0% 偏移居中基准',
      ],
    },
  ];

  const EXTRACTED_RAW = window.ER_EXTRACTED_ASSETS || null;
  const USE_EXTRACTED = Boolean(
    EXTRACTED_RAW &&
    Object.values(EXTRACTED_RAW).some((arr) => Array.isArray(arr) && arr.length > 0)
  );
  const RAW_ASSET = (USE_EXTRACTED ? EXTRACTED_RAW : window.ER_ASSETS) || {};
  const META = (USE_EXTRACTED && window.ER_ASSET_META) || { baseDir: 'extracted_assets', labels: {}, characters: {}, teamBgCrops: {} };
  const LABELS = META.labels || {};
  const CHAR_META = META.characters || {};
  const TEAM_BG_CROPS = META.teamBgCrops || {};
  const WEAPONS = Array.isArray(META.weapons) ? META.weapons : [];
  const CORE_TRAITS = Array.isArray(META.coreTraits) ? META.coreTraits : [];
  const TRAIT_GROUPS = META.traitGroups || {};

  function findCharMeta(charKey) {
    if (!charKey) return null;
    return CHAR_META[charKey] || Object.values(CHAR_META).find((c) => c.token?.toLowerCase() === String(charKey).toLowerCase()) || null;
  }

  function charWeaponKeys(charKey) {
    const cm = findCharMeta(charKey);
    return Array.isArray(cm?.weapons) && cm.weapons.length ? cm.weapons : ['Arcana'];
  }

  function defaultWeaponForChar(charKey) {
    return charWeaponKeys(charKey)[0] || (WEAPONS[0]?.key || 'Arcana');
  }

  const LEGACY_GROUP_TO_CORE = {
    havoc: '7000401',
    chaos: '7300101',
    fort: '7100101',
    support: '7200301',
  };

  function resolveWeaponInfo(r) {
    const key = r.weaponKey || defaultWeaponForChar(r.characterKey);
    return WEAPONS.find((w) => w.key === key) || WEAPONS.find((w) => w.key === defaultWeaponForChar(r.characterKey)) || WEAPONS[0] || null;
  }

  function resolveCoreTraitInfo(r) {
    const wanted = r.coreTrait || LEGACY_GROUP_TO_CORE[r.primaryTrait] || '7300101';
    return CORE_TRAITS.find((t) => t.key === wanted) || CORE_TRAITS[0] || null;
  }

  function resolveSubTraitInfo(r) {
    const key = r.subTrait || 'havoc';
    const g = TRAIT_GROUPS[key];
    const fallbackNames = { havoc: '破坏', chaos: '混沌', fort: '抵抗', support: '支援' };
    return g ? { key, file: g.file, name: g.name } : { key, file: '', name: fallbackNames[key] || '破坏' };
  }

  function getTeamBgCrop(file, fallbackW = 322, fallbackH = 684) {
    const rec = file && TEAM_BG_CROPS[file];
    if (Array.isArray(rec) && rec.length >= 6) {
      return { x0: rec[0], y0: rec[1], cw: rec[2], ch: rec[3], tw: rec[4], th: rec[5] };
    }
    return {
      x0: fallbackW * (8 / 322),
      y0: fallbackH * (2 / 684),
      cw: fallbackW * (282 / 322),
      ch: fallbackH * (640 / 684),
      tw: fallbackW,
      th: fallbackH,
    };
  }

  function teamBgInlineStyle(file) {
    const c = getTeamBgCrop(file);
    const leftPct = -((c.x0 / c.cw) * 100);
    const topPct = -((c.y0 / c.ch) * 100);
    const widthPct = (c.tw / c.cw) * 100;
    const heightPct = (c.th / c.ch) * 100;
    return `left:${leftPct.toFixed(3)}%;top:${topPct.toFixed(3)}%;width:${widthPct.toFixed(3)}%;height:${heightPct.toFixed(3)}%;`;
  }

  let _measureCtx = null;
  function measureFitFontPx(text, maxPxWidth, basePx, minPx, weight, fontFamily) {
    const str = String(text || '');
    if (!str || maxPxWidth <= 10) return basePx;
    if (!_measureCtx) {
      _measureCtx = document.createElement('canvas').getContext('2d');
    }
    let px = basePx;
    _measureCtx.font = `${weight} ${px}px ${fontFamily}`;
    while (px > minPx && _measureCtx.measureText(str).width > maxPxWidth) {
      px = Math.max(minPx, Math.round((px - 0.5) * 10) / 10);
      _measureCtx.font = `${weight} ${px}px ${fontFamily}`;
    }
    return px;
  }

  const WEAPON_ICON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M9.5 17.5L21 6V3h-3L6.5 14.5"/><path d="M11 19l-6-6"/><path d="M8 16l-4 4"/><path d="M5 21l-2-2"/></svg>`;

  const FOLDERS = USE_EXTRACTED
    ? {
        teamBackgrounds: `${META.baseDir || 'extracted_assets'}/teamBackgrounds`,
        avatars: `${META.baseDir || 'extracted_assets'}/avatars`,
        borders: `${META.baseDir || 'extracted_assets'}/borders`,
        characterBackgrounds: `${META.baseDir || 'extracted_assets'}/characterBackgrounds`,
        characterPortraits: `${META.baseDir || 'extracted_assets'}/characterPortraits`,
        halfSkins: `${META.baseDir || 'extracted_assets'}/halfSkins`,
        fullSkins: `${META.baseDir || 'extracted_assets'}/fullSkins`,
        weapons: `${META.baseDir || 'extracted_assets'}/weapons`,
        traits: `${META.baseDir || 'extracted_assets'}/traits`,
      }
    : {
        teamBackgrounds: '队伍格背景',
        avatars: '头像',
        borders: '边框',
        characterBackgrounds: '人物背景',
        characterPortraits: '实验体头像',
        halfSkins: 'Half皮肤',
        fullSkins: 'Full皮肤',
        weapons: 'extracted_assets/weapons',
        traits: 'extracted_assets/traits',
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
    weapons: cleanList(RAW_ASSET.weapons),
    traits: cleanList(RAW_ASSET.traits),
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
    (f) => f === '俞岷.png' || f === '俞岷.webp' || /_YuMin_S000\./i.test(f) || rawZhLabel(f) === '俞岷' || rawZhLabel(f).includes('俞岷')
  );
  const defaultCharKey = characterForPortrait(defaultCharFile);
  const defaultCharZh = characterDisplayName(defaultCharKey);
  const defaultHalf = findAsset(skinsFor(defaultCharKey, 'half'), isDefaultSkinFile);
  const defaultFull = findAsset(skinsFor(defaultCharKey, 'full'), isDefaultSkinFile);

  // ==================== 280x512 (306x560) 实机加载界面像素级基准原点 ====================
  // 整卡 100% 高度参考系下校准：半身立绘中心 X=51.1%、Y=38.0%、宽 96.0%（约 90% 黄金比例且上提贴合实机不凹陷），预览与导出 1:1 完全一致
  const ROLE_BASE = {
    halfX: 51.1,
    halfY: 38.0,
    halfWidth: 96.0,
    fullX: 51.1,
    fullY: 42.0,
    fullWidth: 84.0,
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

  function makeRoleConfigByPreset(opts = {}) {
    const charFile = opts.charToken
      ? findAsset(basePortraits, (f) => new RegExp(`_${opts.charToken}_S000\\.`, 'i').test(f), defaultCharFile)
      : defaultCharFile;
    const cKey = characterForPortrait(charFile);
    const cZh = characterDisplayName(cKey);
    const hSkin = findAsset(skinsFor(cKey, 'half'), isDefaultSkinFile);
    const fSkin = findAsset(skinsFor(cKey, 'full'), isDefaultSkinFile);
    return {
      enabled: true,
      playerName: opts.playerName || '核爆',
      fontKey: 'default',
      customFont: '',
      character: charFile,
      characterKey: cKey,
      variant: 'half',
      halfSkin: hSkin,
      fullSkin: fSkin,
      skin: hSkin,
      skinLabel: displaySkinTitle(cKey, hSkin, 'half'),
      skinColor: '#78d9ff',
      background:
        (opts.bgHint && firstDefault(ASSET.characterBackgrounds, opts.bgHint)) ||
        firstDefault(ASSET.characterBackgrounds, cZh) ||
        findAsset(ASSET.characterBackgrounds, (f) => /_Bg_001\./i.test(f)) ||
        firstDefault(ASSET.characterBackgrounds, '默认背景'),
      border:
        (opts.borderHint && firstDefault(ASSET.borders, opts.borderHint)) ||
        firstDefault(ASSET.borders, cZh) ||
        findAsset(ASSET.borders, (f) => /_Outline_001\./i.test(f)) ||
        firstDefault(ASSET.borders, '默认框'),
      avatar:
        (opts.avatarHint && firstDefault(ASSET.avatars, opts.avatarHint)) ||
        firstDefault(ASSET.avatars, cZh) ||
        ASSET.avatars[0] ||
        '',
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
      showAvatar: true,
      weaponKey: defaultWeaponForChar(cKey),
      coreTrait: opts.coreTrait || '7300101',
      primaryTrait: opts.primaryTrait || 'chaos',
      subTrait: opts.subTrait || 'havoc',
    };
  }

  const makeRoleConfig = () => makeRoleConfigByPreset({
    charToken: 'YuMin',
    playerName: '核爆',
    coreTrait: '7300101',
    subTrait: 'havoc',
  });

  const makeDefaultSquad = () => ({
    selectedSlot: 0,
    squadNumber: '01',
    highlightMySquad: true,
    cardGap: -38,
    members: [
      makeRoleConfigByPreset({ charToken: 'YuMin', playerName: '核爆', coreTrait: '7300101', subTrait: 'havoc', borderHint: '樱花' }),
      makeRoleConfigByPreset({ charToken: 'Rio', playerName: '神秘吹风男', coreTrait: '7000601', subTrait: 'chaos', borderHint: '莉央' }),
      makeRoleConfigByPreset({ charToken: 'Luke', playerName: '鸿璐', coreTrait: '7100101', subTrait: 'havoc', borderHint: '卢克' }),
    ],
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

  // 升级版本号至 v11 (v1.1.1)：在整卡 1:1 参考系下重新上提半身与全身立绘基准原点，消除立绘下沉凹陷问题
  const STORAGE_KEY = 'er-plate-studio-calibrated-v11';
  const LEGACY_KEYS = [
    'er-plate-studio-calibrated-v10',
    'er-plate-studio-calibrated-v9',
    'er-plate-studio-calibrated-v8',
    'er-plate-studio-calibrated-v7',
    'er-plate-studio-calibrated-v6',
    'er-plate-studio-calibrated-v5',
  ];
  const THEME_KEY = 'er-plate-theme-v2';
  const FAVORITES_KEY = 'er-plate-favorites-v1';

  const clamp = (v, min, max) => Math.min(max, Math.max(min, Number(v)));
  const num = (v, fb, min, max) => (Number.isFinite(Number(v)) ? clamp(v, min, max) : fb);
  const fmtSigned = (v, unit = '%') => {
    const n = Math.round(Number(v) * 10) / 10;
    if (n > 0) return `+${n}${unit}`;
    return `${n}${unit}`;
  };

  function sanitizeRoleObj(rawRole, fallbackRole) {
    const freshRole = fallbackRole || makeRoleConfig();
    const out = {
      ...freshRole,
      ...(rawRole || {}),
      halfTransform: { ...freshRole.halfTransform, ...(rawRole?.halfTransform || {}) },
      fullTransform: { ...freshRole.fullTransform, ...(rawRole?.fullTransform || {}) },
    };
    const matchInPool = (pool, file, fb) => {
      if (!file) return fb;
      if (pool.includes(file)) return file;
      const stem = stripExt(file);
      return pool.find((x) => stripExt(x) === stem) || fb;
    };
    const resolvedChar = matchInPool(ASSET.characterPortraits, out.character, '');
    if (!resolvedChar) {
      out.character = freshRole.character;
      out.characterKey = freshRole.characterKey;
      out.halfSkin = freshRole.halfSkin;
      out.fullSkin = freshRole.fullSkin;
      out.skin = out.variant === 'full' ? freshRole.fullSkin : freshRole.halfSkin;
      out.skinLabel = displaySkinTitle(freshRole.characterKey, out.skin, out.variant);
    } else {
      out.character = resolvedChar;
      out.characterKey = characterForPortrait(resolvedChar);
      out.halfSkin = matchInPool(ASSET.halfSkins, out.halfSkin, freshRole.halfSkin);
      out.fullSkin = matchInPool(ASSET.fullSkins, out.fullSkin, freshRole.fullSkin);
      const activePool = out.variant === 'full' ? ASSET.fullSkins : ASSET.halfSkins;
      out.skin = matchInPool(activePool, out.skin, out.variant === 'full' ? out.fullSkin : out.halfSkin);
    }
    out.background = matchInPool(ASSET.characterBackgrounds, out.background, freshRole.background);
    out.border = matchInPool(ASSET.borders, out.border, freshRole.border);
    out.avatar = matchInPool(ASSET.avatars, out.avatar, freshRole.avatar);
    if (!out.weaponKey || (WEAPONS.length && !WEAPONS.some((w) => w.key === out.weaponKey))) {
      out.weaponKey = defaultWeaponForChar(out.characterKey);
    }
    if (!out.coreTrait || (CORE_TRAITS.length && !CORE_TRAITS.some((t) => t.key === out.coreTrait))) {
      out.coreTrait = LEGACY_GROUP_TO_CORE[out.primaryTrait] || '7300101';
    }
    if (!['havoc', 'chaos', 'fort', 'support'].includes(out.subTrait)) {
      out.subTrait = 'havoc';
    }
    if (out.enabled === undefined) out.enabled = true;
    return out;
  }

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
      squad: makeDefaultSquad(),
      teamSlots: [makeTeamSlot(true, 0), makeTeamSlot(true, 1), makeTeamSlot(true, 2), makeTeamSlot(false, 3)],
    };
    try {
      const rawCurrent = localStorage.getItem(STORAGE_KEY);
      const isMigrating = !rawCurrent;
      let legacyRaw = null;
      let migratedFromKey = '';
      if (isMigrating) {
        for (const k of LEGACY_KEYS) {
          legacyRaw = localStorage.getItem(k);
          if (legacyRaw) {
            migratedFromKey = k;
            break;
          }
        }
      }
      const saved = JSON.parse(rawCurrent || legacyRaw || 'null');
      if (!saved || typeof saved !== 'object') return base;
      const fromCalibratedRecent = migratedFromKey === 'er-plate-studio-calibrated-v10' || migratedFromKey === 'er-plate-studio-calibrated-v9';
      base.mode = saved.mode === 'team' ? 'team' : (saved.mode === 'squad' ? 'squad' : 'role');
      base.showClosedTeamSlots = saved.showClosedTeamSlots !== false;
      base.selectedTeamSlot = num(saved.selectedTeamSlot, 0, 0, 3);
      if (saved.teamFontKey) base.teamFontKey = saved.teamFontKey;
      if (saved.teamCustomFont !== undefined) base.teamCustomFont = saved.teamCustomFont;

      if (saved.role && typeof saved.role === 'object') {
        const freshRole = base.role;
        if (isMigrating) {
          const partial = {};
          const keepKeys = [
            'playerName', 'fontKey', 'customFont', 'character', 'characterKey', 'variant',
            'halfSkin', 'fullSkin', 'skin', 'skinLabel', 'skinColor',
            'background', 'border', 'avatar', 'showBadges', 'showAvatar', 'weaponKey', 'coreTrait', 'primaryTrait', 'subTrait',
            ...(fromCalibratedRecent
              ? ['nameFontSize', 'skinFontSize', 'textOffsetX', 'textOffsetY', 'avatarOffsetX', 'avatarOffsetY', 'avatarScale']
              : []),
          ];
          keepKeys.forEach((k) => {
            if (saved.role[k] !== undefined) partial[k] = saved.role[k];
          });
          if (/_Adina_S000\./i.test(String(partial.character || ''))) {
            delete partial.character;
            delete partial.characterKey;
            delete partial.halfSkin;
            delete partial.fullSkin;
            delete partial.skin;
            delete partial.skinLabel;
          }
          base.role = sanitizeRoleObj(partial, freshRole);
        } else {
          base.role = sanitizeRoleObj(saved.role, freshRole);
        }
      }

      if (saved.squad && typeof saved.squad === 'object') {
        const defSq = base.squad;
        base.squad = {
          selectedSlot: num(saved.squad.selectedSlot, 0, 0, 2),
          squadNumber: saved.squad.squadNumber !== undefined ? String(saved.squad.squadNumber) : defSq.squadNumber,
          highlightMySquad: saved.squad.highlightMySquad !== false,
          cardGap: num(saved.squad.cardGap, defSq.cardGap, -54, 24),
          members: [0, 1, 2].map((idx) => sanitizeRoleObj(saved.squad.members?.[idx], defSq.members[idx])),
        };
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
          const merged = isMigrating && !fromCalibratedRecent
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

  const activeRole = () => (state.mode === 'squad' ? state.squad.members[state.squad.selectedSlot] : state.role);
  const currentArtTransform = (roleObj = activeRole()) => (roleObj.variant === 'full' ? roleObj.fullTransform : roleObj.halfTransform);

  // ==================== 本地收藏夹（我的铭牌衣柜） ====================
  function loadFavorites() {
    try {
      const raw = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      return Array.isArray(raw) ? raw.filter((it) => it && typeof it === 'object' && it.config) : [];
    } catch {
      return [];
    }
  }
  let favorites = loadFavorites();
  let favDrawerOpen = false;

  function saveFavorites() {
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); } catch {}
    if (el('favCountBadge')) el('favCountBadge').textContent = String(favorites.length);
  }

  function cloneRoleConfig(r) {
    return JSON.parse(JSON.stringify(r));
  }

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
  const pickerFilterMap = new Map();
  const panelScrollEl = document.querySelector('.panel-scroll');
  let outerScrollLockUntil = 0;

  const SKIN_COLOR_SWATCHES = [
    { color: '#78d9ff', title: '实机冰蓝（默认）' },
    { color: '#fbbf24', title: '传说耀金' },
    { color: '#f472b6', title: '春樱柔粉' },
    { color: '#c084fc', title: '混沌魅紫' },
    { color: '#4ade80', title: '翡冷翠绿' },
    { color: '#ffffff', title: '纯净亮白' },
  ];

  const RE_ESPORTS = /(S\d+\s*[・·]|202\d\s+(?:GC|Daegu|INCHEON|GJ|DAEJEON|FN|Gyeonggi|New Rise|Chungnam|JEONNAM|GyeongBuk|Gyeongnam|Jeju|Goyang|Seongnam|YJ)|CNJ|ROX|SEJONG|CYBERS|AutoArms|Sparkle|Incheon|INCHEON|Slasher|Innate|BeSPA|Phalanx|Guardians|Ascenders|Whales|MIR|WAVE|BUSAN|ESPORTS|FearX|Shadow|GEN\.G|ERCC|电竞助力者)/i;
  const RE_DROPS_RANK = /(赛季|排位|永恒|半神|无瑕|星陨|灭钻|修罗|金魄|银烙|铜魂|铁阎|泰坦|CHAMPION|WINNER|冠军|挑战赛|电竞社区|电竞参赛者|KEL|ERM|JAPAN CUP|SUPPORTERS|CAMPUS|Marathoner|合作伙伴|BILIBILI|Naver|WeGame)/i;

  // 按用户需求精简分类：边框与背景仅分「全部 / 电竞战队包」；头像分「全部 / 电竞战队包 / 排位·比赛·掉宝 / 实验体头像」
  const PICKER_FILTERS = {
    border: [
      { key: 'all', label: '全部', fn: () => true },
      { key: 'esports', label: '电竞战队包', fn: (f, z) => RE_ESPORTS.test(z) || RE_ESPORTS.test(f) },
    ],
    roleBackground: [
      { key: 'all', label: '全部', fn: () => true },
      { key: 'esports', label: '电竞战队包', fn: (f, z) => RE_ESPORTS.test(z) || RE_ESPORTS.test(f) },
    ],
    background: [
      { key: 'all', label: '全部', fn: () => true },
      { key: 'esports', label: '电竞战队包', fn: (f, z) => RE_ESPORTS.test(z) || RE_ESPORTS.test(f) },
    ],
    avatar: [
      { key: 'all', label: '全部', fn: () => true },
      { key: 'esports', label: '电竞战队包', fn: (f, z) => RE_ESPORTS.test(z) || RE_ESPORTS.test(f) },
      {
        key: 'drops',
        label: '排位/比赛/掉宝',
        fn: (f, z) => !RE_ESPORTS.test(z) && (RE_DROPS_RANK.test(z) || RE_DROPS_RANK.test(f) || /_103\d{3}\./i.test(f)),
      },
      {
        key: 'hero',
        label: '实验体头像',
        fn: (f, z) => !RE_ESPORTS.test(z) && (/_1020\d\d\./i.test(f) || /_1080\d\d\./i.test(f) || (/头像$/.test(z) && !RE_DROPS_RANK.test(z))),
      },
    ],
  };

  if (panelScrollEl) {
    panelScrollEl.addEventListener('wheel', (e) => {
      const insideGrid = e.target.closest('.asset-grid');
      if (!insideGrid) {
        outerScrollLockUntil = performance.now() + 140;
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
    const activeCat = pickerFilterMap.get(pickerKey) || 'all';
    const filters = PICKER_FILTERS[kind] || null;
    const filterHtml = filters
      ? `<div class="picker-filter-bar">${filters
          .map((flt) => `<button type="button" class="picker-filter-chip${activeCat === flt.key ? ' active' : ''}" data-filter-key="${flt.key}">${esc(flt.label)}</button>`)
          .join('')}</div>`
      : '';

    return `<div class="field picker${isCollapsed ? ' is-collapsed' : ''}" data-picker-kind="${kind}" data-folder="${folder}">
      <div class="picker-head">
        <span class="field-label">${title}</span>
        <span class="picker-head-right">
          <span class="picker-count"></span>
          <button type="button" class="picker-locate-btn" title="在列表中滚动定位到当前已选素材">◎ 定位</button>
          <button type="button" class="picker-collapse-btn">${isCollapsed ? '展开' : '收起'}</button>
        </span>
      </div>
      <input class="picker-search" type="search" value="${esc(savedQuery)}" placeholder="搜索${searchHint}…">
      ${filterHtml}
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
    const locateBtn = box.querySelector('.picker-locate-btn');
    const collapseBtn = box.querySelector('.picker-collapse-btn');
    const filterChips = box.querySelectorAll('[data-filter-key]');
    const pickerKey = `${state.mode}:${kind}`;
    const BATCH = 120;

    let currentList = [];
    let renderedCount = 0;

    const expandIfCollapsed = () => {
      if (box.classList.contains('is-collapsed')) {
        box.classList.remove('is-collapsed');
        collapsedPickers.delete(pickerKey);
        if (collapseBtn) collapseBtn.textContent = '收起';
      }
    };

    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        const isNowCollapsed = box.classList.toggle('is-collapsed');
        if (isNowCollapsed) collapsedPickers.add(pickerKey);
        else collapsedPickers.delete(pickerKey);
        collapseBtn.textContent = isNowCollapsed ? '展开' : '收起';
      });
    }

    grid.addEventListener('mouseenter', () => { outerScrollLockUntil = 0; });
    grid.addEventListener('mousemove', () => { outerScrollLockUntil = 0; }, { passive: true });
    grid.addEventListener('mousedown', () => { outerScrollLockUntil = 0; });
    grid.addEventListener('wheel', (e) => {
      if (panelScrollEl && performance.now() < outerScrollLockUntil) {
        e.preventDefault();
        panelScrollEl.scrollTop += e.deltaY;
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
      const activeCat = pickerFilterMap.get(pickerKey) || 'all';
      const catDef = (PICKER_FILTERS[kind] || []).find((c) => c.key === activeCat);
      const sel = getSelected();

      currentList = options.filter((f) => {
        const zh = rawZhLabel(f);
        if (catDef && catDef.key !== 'all' && !catDef.fn(f, zh)) return false;
        if (!q) return true;
        return f.toLowerCase().includes(q) || zh.toLowerCase().includes(q);
      });
      countEl.textContent = currentList.length === options.length
        ? `${options.length} 项`
        : `${currentList.length}/${options.length} 项`;
      renderedCount = 0;

      if (!currentList.length) {
        grid.innerHTML = '<div class="asset-empty">当前筛选下无匹配素材</div>';
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

    const locateSelected = (scrollPanel = false) => {
      expandIfCollapsed();
      const sel = getSelected();
      if (sel && currentList.indexOf(sel) === -1) {
        input.value = '';
        pickerSearchMap.set(pickerKey, '');
        pickerFilterMap.set(pickerKey, 'all');
        filterChips.forEach((ch) => ch.classList.toggle('active', ch.dataset.filterKey === 'all'));
        rebuild(false);
      }
      const selIdx = sel ? currentList.indexOf(sel) : -1;
      if (selIdx >= renderedCount) {
        appendMore(selIdx + 32);
      }
      requestAnimationFrame(() => {
        const selNode = grid.querySelector('.asset-option.selected');
        if (selNode) {
          const gridRect = grid.getBoundingClientRect();
          const nodeRect = selNode.getBoundingClientRect();
          const targetGridTop = grid.scrollTop + (nodeRect.top - gridRect.top) - (grid.clientHeight - nodeRect.height) / 2;
          grid.scrollTop = Math.max(0, targetGridTop);
          pickerScrollMap.set(pickerKey, grid.scrollTop);
        }
        if (scrollPanel && panelScrollEl) {
          const panelRect = panelScrollEl.getBoundingClientRect();
          const boxRect = box.getBoundingClientRect();
          const targetPanelTop = panelScrollEl.scrollTop + (boxRect.top - panelRect.top) - 10;
          panelScrollEl.scrollTo({ top: Math.max(0, targetPanelTop), behavior: 'smooth' });
          box.classList.remove('flash-focus');
          void box.offsetWidth;
          box.classList.add('flash-focus');
        }
      });
    };

    if (locateBtn) {
      locateBtn.addEventListener('click', () => locateSelected(false));
    }

    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const key = chip.dataset.filterKey || 'all';
        pickerFilterMap.set(pickerKey, key);
        filterChips.forEach((c) => c.classList.toggle('active', c.dataset.filterKey === key));
        pickerScrollMap.set(pickerKey, 0);
        rebuild(false);
      });
    });

    input.addEventListener('input', () => {
      pickerScrollMap.set(pickerKey, 0);
      rebuild(false);
    });

    rebuild(true);

    return {
      rebuild,
      locateSelected,
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

  // ==================== 收藏夹抽屉 & 三人加载连排顶栏 & 单人/连排共用角色编辑器 ====================
  function weaponOptionsHtml(charKey, curWeaponKey) {
    if (!WEAPONS.length) {
      return '<option value="Arcana">圣器</option>';
    }
    const charWKeys = charWeaponKeys(charKey);
    const ownWeapons = WEAPONS.filter((w) => charWKeys.includes(w.key));
    const otherWeapons = WEAPONS.filter((w) => !charWKeys.includes(w.key));
    const renderOpt = (w) => `<option value="${esc(w.key)}" ${w.key === curWeaponKey ? 'selected' : ''}>${esc(w.name)}</option>`;
    if (!ownWeapons.length) return WEAPONS.map(renderOpt).join('');
    return `<optgroup label="本实验体可用武器">${ownWeapons.map(renderOpt).join('')}</optgroup>
      <optgroup label="全部武器（自由混搭）">${otherWeapons.map(renderOpt).join('')}</optgroup>`;
  }

  function coreTraitOptionsHtml(curCoreKey) {
    if (!CORE_TRAITS.length) {
      return '<option value="7300101">星尘蓄势</option>';
    }
    const groupOrder = [
      { key: 'havoc', label: '破坏系核心' },
      { key: 'chaos', label: '混沌系核心' },
      { key: 'fort', label: '抵抗系核心' },
      { key: 'support', label: '支援系核心' },
    ];
    return groupOrder
      .map((g) => {
        const list = CORE_TRAITS.filter((t) => t.group === g.key);
        if (!list.length) return '';
        return `<optgroup label="${g.label}">${list
          .map((t) => `<option value="${esc(t.key)}" ${t.key === curCoreKey ? 'selected' : ''}>${esc(t.name)}</option>`)
          .join('')}</optgroup>`;
      })
      .join('');
  }

  function renderFavoritesDrawer() {
    const drawer = el('favoritesDrawer');
    if (el('favCountBadge')) el('favCountBadge').textContent = String(favorites.length);
    if (el('favDrawerBtn')) el('favDrawerBtn').classList.toggle('active', favDrawerOpen);
    if (!drawer) return;
    drawer.hidden = !favDrawerOpen;
    if (!favDrawerOpen) return;

    const targetLabel = state.mode === 'squad'
      ? `载入至队员0${state.squad.selectedSlot + 1}`
      : '载入';

    const listHtml = favorites.length
      ? `<div class="fav-list">${favorites
          .map((fav, idx) => {
            const c = fav.config || {};
            const charZh = characterDisplayName(c.characterKey) || '实验体';
            const borderZh = cleanDisplayLabel(c.border, 'border') || '默认框';
            return `<div class="fav-item" data-fav-idx="${idx}">
              <div class="fav-item-thumbs">
                <img src="${assetPath(FOLDERS.characterPortraits, c.character)}" alt="">
                <img class="is-border" src="${assetPath(FOLDERS.borders, c.border)}" alt="">
              </div>
              <div class="fav-item-info">
                <div class="fav-item-name" title="${esc(fav.title)}">${esc(fav.title)}</div>
                <div class="fav-item-sub">${esc(charZh)} · ${esc(borderZh)} · 昵称「${esc(c.playerName || '—')}」</div>
              </div>
              <div class="fav-item-actions">
                <button type="button" class="fav-act-btn primary" data-fav-act="load">${targetLabel}</button>
                <button type="button" class="fav-act-btn" data-fav-act="overwrite" title="用当前正在编辑的搭配覆盖此收藏">覆盖</button>
                <button type="button" class="fav-act-btn" data-fav-act="rename" title="重命名此收藏">改名</button>
                <button type="button" class="fav-act-btn danger" data-fav-act="delete" title="删除">✕</button>
              </div>
            </div>`;
          })
          .join('')}</div>`
      : '<div class="fav-empty">暂无收藏方案 · 配好喜欢的铭牌后点击右上角「+ 收藏当前搭配」即可随时一键复用或装填三人车队！</div>';

    drawer.innerHTML = `<div class="fav-drawer-head">
        <span class="fav-drawer-title">★ 我的铭牌收藏夹（浏览器本地持久保存）</span>
        <button type="button" class="fav-save-btn" id="saveCurrentFavBtn">+ 收藏当前搭配</button>
      </div>
      ${listHtml}`;

    el('saveCurrentFavBtn')?.addEventListener('click', () => {
      const r = activeRole();
      const charZh = characterDisplayName(r.characterKey) || '实验体';
      const borderZh = cleanDisplayLabel(r.border, 'border') || '默认框';
      const defaultTitle = `${charZh} · ${borderZh}`;
      favorites.unshift({
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        title: defaultTitle,
        savedAt: Date.now(),
        config: cloneRoleConfig(r),
      });
      saveFavorites();
      renderFavoritesDrawer();
      showToast(`已收藏「${defaultTitle}」`);
    });

    drawer.querySelectorAll('.fav-item').forEach((row) => {
      const idx = Number(row.dataset.favIdx);
      const item = favorites[idx];
      if (!item) return;
      row.querySelector('[data-fav-act="load"]')?.addEventListener('click', () => {
        const restored = sanitizeRoleObj(cloneRoleConfig(item.config), makeRoleConfig());
        if (state.mode === 'squad') {
          restored.enabled = state.squad.members[state.squad.selectedSlot].enabled;
          state.squad.members[state.squad.selectedSlot] = restored;
          renderSquadHead();
          renderRoleEditor();
          renderPreview();
          showToast(`已将「${item.title}」载入至队员 0${state.squad.selectedSlot + 1}`);
        } else {
          state.role = restored;
          renderRoleEditor();
          renderPreview();
          showToast(`已载入收藏方案「${item.title}」`);
        }
      });
      row.querySelector('[data-fav-act="overwrite"]')?.addEventListener('click', () => {
        item.config = cloneRoleConfig(activeRole());
        item.savedAt = Date.now();
        saveFavorites();
        renderFavoritesDrawer();
        showToast(`已更新收藏方案「${item.title}」`);
      });
      row.querySelector('[data-fav-act="rename"]')?.addEventListener('click', () => {
        const nextName = window.prompt('请输入新的收藏方案名称：', item.title);
        if (nextName && nextName.trim()) {
          item.title = nextName.trim().slice(0, 36);
          saveFavorites();
          renderFavoritesDrawer();
        }
      });
      row.querySelector('[data-fav-act="delete"]')?.addEventListener('click', () => {
        favorites.splice(idx, 1);
        saveFavorites();
        renderFavoritesDrawer();
        showToast('已删除该条收藏');
      });
    });
  }

  function renderSquadHead() {
    const box = el('squadControlHead');
    if (!box) return;
    if (state.mode !== 'squad') {
      box.hidden = true;
      return;
    }
    box.hidden = false;
    const sq = state.squad;
    const curMember = sq.members[sq.selectedSlot];

    box.innerHTML = `<div class="squad-head-card">
      <div class="slot-tabs">
        ${sq.members
          .map((m, i) => {
            const cZh = characterDisplayName(m.characterKey) || `0${i + 1}`;
            return `<button type="button" class="slot-tab${sq.selectedSlot === i ? ' active' : ''}${m.enabled !== false ? ' enabled' : ''}" data-sq-tab="${i}">0${i + 1} · ${esc(cZh)}</button>`;
          })
          .join('')}
      </div>
      <div class="squad-meta-row">
        <label class="switch-label">
          <input id="squadMemberEnabled" type="checkbox" ${curMember.enabled !== false ? 'checked' : ''}>
          启用本号位
        </label>
        <div style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap">
          <select id="squadNumSelect" class="squad-num-select" title="左上角加载界面小队编号">
            <option value="" ${sq.squadNumber === '' ? 'selected' : ''}>隐藏队标号</option>
            ${['01', '02', '03', '04', '05', '06', '07', '08']
              .map((n) => `<option value="${n}" ${sq.squadNumber === n ? 'selected' : ''}>小队 #${n}</option>`)
              .join('')}
          </select>
          <label class="switch-label" title="开启后队标数字呈现实机本队专属青色高亮">
            <input id="squadHighlightToggle" type="checkbox" ${sq.highlightMySquad ? 'checked' : ''}>
            本队青色
          </label>
        </div>
      </div>
      <label class="range-field">
        <span>卡片连排紧凑间距 <output id="squadGapVal">${sq.cardGap}px</output></span>
        <input id="squadGapRange" type="range" min="-52" max="16" step="1" value="${sq.cardGap}" title="双击恢复实机标准紧凑间距 -38px">
      </label>
      <div class="squad-quick-actions">
        <button type="button" class="mini-reset-btn" id="copyFromSoloBtn" title="把「单人铭牌」模式当前配好的整张卡复制到本号位">📥 导入单人铭牌至本槽</button>
        <button type="button" class="mini-reset-btn" id="syncSquadFontBtn" title="将当前号位的字体与字号一键同步给全队 3 人">⇄ 同步字体与字号到全队</button>
      </div>
    </div>`;

    box.querySelectorAll('[data-sq-tab]').forEach((b) => {
      b.addEventListener('click', () => {
        sq.selectedSlot = Number(b.dataset.sqTab);
        renderFavoritesDrawer();
        renderSquadHead();
        renderRoleEditor();
        renderPreview();
      });
    });

    el('squadMemberEnabled')?.addEventListener('change', (e) => {
      const enabledNow = sq.members.filter((m, idx) => (idx === sq.selectedSlot ? e.target.checked : m.enabled !== false)).length;
      if (enabledNow < 1) {
        e.target.checked = true;
        showToast('加载连排至少需保留 1 名队员');
        return;
      }
      curMember.enabled = e.target.checked;
      renderSquadHead();
      renderPreview();
    });

    el('squadNumSelect')?.addEventListener('change', (e) => {
      sq.squadNumber = e.target.value;
      renderPreview();
    });
    el('squadHighlightToggle')?.addEventListener('change', (e) => {
      sq.highlightMySquad = e.target.checked;
      renderPreview();
    });
    el('squadGapRange')?.addEventListener('input', (e) => {
      sq.cardGap = num(e.target.value, -38, -52, 16);
      el('squadGapVal').textContent = `${sq.cardGap}px`;
      renderPreview();
    });
    el('squadGapRange')?.addEventListener('dblclick', () => {
      sq.cardGap = -38;
      el('squadGapRange').value = -38;
      el('squadGapVal').textContent = '-38px';
      renderPreview();
    });
    el('copyFromSoloBtn')?.addEventListener('click', () => {
      const cloned = cloneRoleConfig(state.role);
      cloned.enabled = curMember.enabled;
      sq.members[sq.selectedSlot] = sanitizeRoleObj(cloned, makeRoleConfig());
      renderSquadHead();
      renderRoleEditor();
      renderPreview();
      showToast(`已将单人铭牌搭配导入至队员 0${sq.selectedSlot + 1}`);
    });
    el('syncSquadFontBtn')?.addEventListener('click', () => {
      sq.members.forEach((m) => {
        m.fontKey = curMember.fontKey;
        m.customFont = curMember.customFont;
        m.nameFontSize = curMember.nameFontSize;
        m.skinFontSize = curMember.skinFontSize;
      });
      renderPreview();
      showToast('已将当前号位的字体与双行字号同步到全小队');
    });
  }

  function renderRoleEditor() {
    const r = activeRole();
    const tf = currentArtTransform(r);
    const box = el('roleEditor');
    const prevPanelScroll = panelScrollEl ? panelScrollEl.scrollTop : 0;
    const curWeapon = resolveWeaponInfo(r);
    const curCore = resolveCoreTraitInfo(r);

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
            <input id="roleSkinColor" type="color" value="${esc(r.skinColor || '#78d9ff')}" title="自定义头衔颜色">
          </div>
          <div class="color-swatch-row">
            <span class="color-swatch-label">快捷色：</span>
            ${SKIN_COLOR_SWATCHES.map((sw) => `<button type="button" class="color-swatch-dot${(r.skinColor || '#78d9ff').toLowerCase() === sw.color ? ' active' : ''}" data-swatch="${sw.color}" style="background:${sw.color}" title="${esc(sw.title)}"></button>`).join('')}
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

          <label class="range-field"><span><em id="artModeLblX" style="font-style:normal">${r.variant === 'full' ? '全身' : '半身'}立绘偏移 X</em><output id="artXVal">${fmtSigned(tf.x)}</output></span><input id="artX" type="range" min="-45" max="45" step="0.5" value="${tf.x}"></label>
          <label class="range-field"><span><em id="artModeLblY" style="font-style:normal">${r.variant === 'full' ? '全身' : '半身'}立绘偏移 Y</em><output id="artYVal">${fmtSigned(tf.y)}</output></span><input id="artY" type="range" min="-45" max="45" step="0.5" value="${tf.y}"></label>
          <label class="range-field range-full"><span><em id="artModeLblS" style="font-style:normal">${r.variant === 'full' ? '全身' : '半身'}立绘缩放</em><output id="artScaleVal">${tf.scale}%</output></span><input id="artScale" type="range" min="40" max="160" step="1" value="${tf.scale}"></label>

          <label class="range-field"><span>头像水平偏移 X <output id="roleAvXVal">${fmtSigned(r.avatarOffsetX)}</output></span><input id="roleAvX" type="range" min="-15" max="35" step="0.5" value="${r.avatarOffsetX}"></label>
          <label class="range-field"><span>头像垂直偏移 Y <output id="roleAvYVal">${fmtSigned(r.avatarOffsetY)}</output></span><input id="roleAvY" type="range" min="-20" max="20" step="0.5" value="${r.avatarOffsetY}"></label>
          <label class="range-field range-full"><span>头像缩放 <output id="roleAvScaleVal">${r.avatarScale}%</output></span><input id="roleAvScale" type="range" min="50" max="150" step="1" value="${r.avatarScale}"></label>
        </div>
      </details>

      <div class="badge-config-box">
        <div class="editor-row-between">
          <label class="switch-label">
            <input id="roleShowBadges" type="checkbox" ${r.showBadges ? 'checked' : ''}>
            左上实机武器 &amp; 潜能图标
          </label>
          <label class="switch-label">
            <input id="roleShowAvatar" type="checkbox" ${r.showAvatar !== false ? 'checked' : ''}>
            左下玩家头像
          </label>
        </div>
        <div class="badge-select-grid" id="roleBadgeSelects" ${r.showBadges ? '' : 'hidden'}>
          <label class="badge-select-field">
            <span>武器类型</span>
            <select id="roleWeaponSelect" aria-label="武器图标">
              ${weaponOptionsHtml(r.characterKey, curWeapon?.key || 'Arcana')}
            </select>
          </label>
          <label class="badge-select-field">
            <span>核心潜能</span>
            <select id="roleCoreTrait" aria-label="核心潜能">
              ${coreTraitOptionsHtml(curCore?.key || '7300101')}
            </select>
          </label>
          <label class="badge-select-field">
            <span>副系潜能</span>
            <select id="roleSubTrait" aria-label="副系潜能">
              <option value="havoc" ${r.subTrait === 'havoc' ? 'selected' : ''}>破坏</option>
              <option value="chaos" ${r.subTrait === 'chaos' ? 'selected' : ''}>混沌</option>
              <option value="fort" ${r.subTrait === 'fort' ? 'selected' : ''}>抵抗</option>
              <option value="support" ${r.subTrait === 'support' ? 'selected' : ''}>支援</option>
            </select>
          </label>
        </div>
      </div>

      <div class="loadout-overview" id="roleOverviewBar" aria-label="当前已选装扮速览（点击定位）">
        <button type="button" class="overview-chip" data-jump-kind="character" title="点击跳转并居中定位到当前选中的实验体">
          <img id="ovCharImg" src="${assetPath(FOLDERS.characterPortraits, r.character)}" alt="">
          <span class="overview-chip-meta">
            <span class="overview-chip-tag">实验体 · 皮肤</span>
            <span class="overview-chip-name" id="ovSkinText"></span>
          </span>
        </button>
        <button type="button" class="overview-chip" data-jump-kind="border" title="点击跳转并居中定位到当前铭牌边框">
          <img id="ovBorderImg" class="is-contain" src="${assetPath(FOLDERS.borders, r.border)}" alt="">
          <span class="overview-chip-meta">
            <span class="overview-chip-tag">铭牌边框</span>
            <span class="overview-chip-name" id="ovBorderText"></span>
          </span>
        </button>
        <button type="button" class="overview-chip" data-jump-kind="roleBackground" title="点击跳转并居中定位到当前人物背景板">
          <img id="ovBgImg" class="is-contain" src="${assetPath(FOLDERS.characterBackgrounds, r.background)}" alt="">
          <span class="overview-chip-meta">
            <span class="overview-chip-tag">人物背景板</span>
            <span class="overview-chip-name" id="ovBgText"></span>
          </span>
        </button>
        <button type="button" class="overview-chip" data-jump-kind="avatar" title="点击跳转并居中定位到当前左下玩家头像">
          <img id="ovAvImg" src="${assetPath(FOLDERS.avatars, r.avatar)}" alt="">
          <span class="overview-chip-meta">
            <span class="overview-chip-tag">左下玩家头像</span>
            <span class="overview-chip-name" id="ovAvText"></span>
          </span>
        </button>
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

    const syncSwatchDots = () => {
      const cur = (r.skinColor || '#78d9ff').toLowerCase();
      box.querySelectorAll('[data-swatch]').forEach((d) => {
        d.classList.toggle('active', d.dataset.swatch === cur);
      });
    };

    const syncRoleOverview = () => {
      const charZh = characterDisplayName(r.characterKey) || '实验体';
      const skinShort = isDefaultSkinFile(r.skin) ? '原皮' : cleanDisplayLabel(r.skin, 'skin');
      if (el('ovCharImg')) el('ovCharImg').src = assetPath(FOLDERS.characterPortraits, r.character);
      if (el('ovSkinText')) el('ovSkinText').textContent = `${charZh} · ${skinShort}`;
      if (el('ovBorderImg')) el('ovBorderImg').src = assetPath(FOLDERS.borders, r.border);
      if (el('ovBorderText')) el('ovBorderText').textContent = cleanDisplayLabel(r.border, 'border') || '未选';
      if (el('ovBgImg')) el('ovBgImg').src = assetPath(FOLDERS.characterBackgrounds, r.background);
      if (el('ovBgText')) el('ovBgText').textContent = cleanDisplayLabel(r.background, 'roleBackground') || '未选';
      if (el('ovAvImg')) el('ovAvImg').src = assetPath(FOLDERS.avatars, r.avatar);
      if (el('ovAvText')) el('ovAvText').textContent = cleanDisplayLabel(r.avatar, 'avatar') || '未选';
    };
    syncRoleOverview();

    el('rolePlayerName').addEventListener('input', (e) => { r.playerName = e.target.value; renderPreview(); });
    el('roleSkinLabel').addEventListener('input', (e) => { r.skinLabel = e.target.value; renderPreview(); });
    el('roleSkinColor').addEventListener('input', (e) => {
      r.skinColor = e.target.value;
      syncSwatchDots();
      renderPreview();
    });
    box.querySelectorAll('[data-swatch]').forEach((dot) => {
      dot.addEventListener('click', () => {
        r.skinColor = dot.dataset.swatch;
        el('roleSkinColor').value = r.skinColor;
        syncSwatchDots();
        renderPreview();
      });
    });
    el('roleShowBadges').addEventListener('change', (e) => {
      r.showBadges = e.target.checked;
      if (el('roleBadgeSelects')) el('roleBadgeSelects').hidden = !r.showBadges;
      renderPreview();
    });
    el('roleShowAvatar').addEventListener('change', (e) => { r.showAvatar = e.target.checked; renderPreview(); });
    el('roleWeaponSelect').addEventListener('change', (e) => { r.weaponKey = e.target.value; renderPreview(); });
    el('roleCoreTrait').addEventListener('change', (e) => { r.coreTrait = e.target.value; renderPreview(); });
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
      el('artModeLblX').textContent = `${modeWord}立绘偏移 X`;
      el('artModeLblY').textContent = `${modeWord}立绘偏移 Y`;
      el('artModeLblS').textContent = `${modeWord}立绘缩放`;
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
        syncRoleOverview();
        renderPreview();
      }
    );

    box.querySelectorAll('[data-variant]').forEach((btn) =>
      btn.addEventListener('click', () => {
        const prevAutoTitle = displaySkinTitle(r.characterKey, r.skin, r.variant);
        const hadCustomTitle = Boolean(r.skinLabel && r.skinLabel !== prevAutoTitle);
        r.variant = btn.dataset.variant;
        box.querySelectorAll('[data-variant]').forEach((b) => b.classList.toggle('active', b.dataset.variant === r.variant));
        r.skin = r.variant === 'full' ? r.fullSkin : r.halfSkin;
        if (!r.skin) r.skin = skinsFor(r.characterKey, r.variant)[0] || '';
        const nextAutoTitle = displaySkinTitle(r.characterKey, r.skin, r.variant);
        if (!hadCustomTitle || nextAutoTitle !== prevAutoTitle) {
          r.skinLabel = nextAutoTitle;
          el('roleSkinLabel').value = r.skinLabel;
        }
        syncSliderInputs();
        syncRoleOverview();
        if (skinPickerCtrl) {
          skinPickerCtrl.setFolderAndTitle(
            r.variant === 'full' ? FOLDERS.fullSkins : FOLDERS.halfSkins,
            `${characterDisplayName(r.characterKey)} 皮肤列表`
          );
          pickerScrollMap.set(`${state.mode}:skin`, 0);
          skinPickerCtrl.rebuild(false);
        }
        renderPreview();
      })
    );

    const charPickerCtrl = mountPicker(box, 'character', basePortraits, () => r.character, (file) => {
      r.character = file;
      r.characterKey = characterForPortrait(file);
      r.weaponKey = defaultWeaponForChar(r.characterKey);
      r.halfSkin = findAsset(skinsFor(r.characterKey, 'half'), isDefaultSkinFile);
      r.fullSkin = findAsset(skinsFor(r.characterKey, 'full'), isDefaultSkinFile);
      r.skin = r.variant === 'full' ? r.fullSkin : r.halfSkin;
      r.skinLabel = displaySkinTitle(r.characterKey, r.skin, r.variant);
      el('roleSkinLabel').value = r.skinLabel;
      if (el('roleWeaponSelect')) {
        el('roleWeaponSelect').innerHTML = weaponOptionsHtml(r.characterKey, r.weaponKey);
      }
      syncRoleOverview();
      if (state.mode === 'squad') {
        renderSquadHead();
      }
      if (skinPickerCtrl) {
        skinPickerCtrl.setFolderAndTitle(
          r.variant === 'full' ? FOLDERS.fullSkins : FOLDERS.halfSkins,
          `${characterDisplayName(r.characterKey)} 皮肤列表`
        );
        pickerScrollMap.set(`${state.mode}:skin`, 0);
        skinPickerCtrl.rebuild(false);
      }
      renderPreview();
    });

    const borderPickerCtrl = mountPicker(box, 'border', ASSET.borders, () => r.border, (file) => {
      r.border = file;
      syncRoleOverview();
      renderPreview();
    });
    const bgPickerCtrl = mountPicker(box, 'roleBackground', ASSET.characterBackgrounds, () => r.background, (file) => {
      r.background = file;
      syncRoleOverview();
      renderPreview();
    });
    const avPickerCtrl = mountPicker(box, 'avatar', ASSET.avatars, () => r.avatar, (file) => {
      r.avatar = file;
      syncRoleOverview();
      renderPreview();
    });

    const ctrlMap = {
      character: charPickerCtrl,
      skin: skinPickerCtrl,
      border: borderPickerCtrl,
      roleBackground: bgPickerCtrl,
      avatar: avPickerCtrl,
    };
    box.querySelectorAll('[data-jump-kind]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const target = ctrlMap[chip.dataset.jumpKind];
        if (target?.locateSelected) target.locateSelected(true);
      });
    });

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

      <div class="inline-size-sync">
        <label class="range-field">
          <span>当前槽位名字字号 <output id="tQuickFsVal">${slot.nameFontSize}px</output></span>
          <input id="tQuickFs" type="range" min="10" max="24" step="0.5" value="${slot.nameFontSize}" title="双击恢复默认 14px">
        </label>
        <button type="button" class="sync-pill-btn" id="syncTeamFontSizeAll" title="将当前号位的名字字号一键同步应用到全部 4 个队友槽位">⇄ 同步字号到全队</button>
      </div>

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
      el('tQuickFs').value = slot.nameFontSize; el('tQuickFsVal').textContent = `${slot.nameFontSize}px`;
      el('tNameFs').value = slot.nameFontSize; el('tNameFsVal').textContent = `${slot.nameFontSize}px`;
      el('tNameOp').value = slot.nameBgOpacity; el('tNameOpVal').textContent = `${slot.nameBgOpacity}%`;
      el('tNameMinW').value = slot.nameMinWidth; el('tNameMinWVal').textContent = `${slot.nameMinWidth}%`;
      el('tNameX').value = slot.nameOffsetX; el('tNameXVal').textContent = fmtSigned(slot.nameOffsetX);
      el('tNameOff').value = slot.nameOffsetY; el('tNameOffVal').textContent = fmtSigned(slot.nameOffsetY);
      el('tAvX').value = slot.avatarOffsetX; el('tAvXVal').textContent = fmtSigned(slot.avatarOffsetX);
      el('tAvY').value = slot.avatarOffsetY; el('tAvYVal').textContent = fmtSigned(slot.avatarOffsetY);
      el('tAvS').value = slot.avatarScale; el('tAvSVal').textContent = `${slot.avatarScale}%`;
    };

    el('tQuickFs').addEventListener('input', () => {
      slot.nameFontSize = num(el('tQuickFs').value, slot.nameFontSize, 10, 24);
      el('tQuickFsVal').textContent = `${slot.nameFontSize}px`;
      el('tNameFs').value = slot.nameFontSize;
      el('tNameFsVal').textContent = `${slot.nameFontSize}px`;
      renderPreview();
    });
    el('tQuickFs').addEventListener('dblclick', () => {
      slot.nameFontSize = TEAM_SLOT_DEFAULTS.nameFontSize;
      syncTeamSliders();
      renderPreview();
    });
    el('syncTeamFontSizeAll').addEventListener('click', () => {
      state.teamSlots.forEach((s) => { s.nameFontSize = slot.nameFontSize; });
      renderPreview();
      showToast(`已将名字字号 ${slot.nameFontSize}px 同步到全队所有槽位`);
    });

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
    bind('tNameFs', 'tNameFsVal', 'nameFontSize', 10, 24, (v) => {
      if (el('tQuickFs')) { el('tQuickFs').value = v; el('tQuickFsVal').textContent = `${v}px`; }
      return `${v}px`;
    });
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

  // ==================== 画布直接拖拽移动立绘 + 滚轮/双指捏合缩放立绘（桌面与手机双端 120fps 原位丝滑交互） ====================
  const isTouchPrimary = () => Boolean(window.matchMedia?.('(pointer: coarse)')?.matches || 'ontouchstart' in window);
  const isInAppWebView = () => /MicroMessenger|QQ\/|TIM\/|Weibo/i.test(navigator.userAgent || '');

  let currentStageScale = 1;
  let currentStageNatW = 306;
  let currentStageNatH = 560;
  let currentStageMaxScale = 1.08;
  let dragCtx = null;
  let pinchCtx = null;

  function computeStageFit(natW, natH, maxScale) {
    const stageEl = el('previewStage');
    const pad = window.innerWidth <= 960 ? 12 : 24;
    const availW = Math.max(120, (stageEl?.clientWidth || 360) - pad);
    const availH = Math.max(120, (stageEl?.clientHeight || 360) - pad);
    return clamp(Math.min(maxScale, availW / natW, availH / natH), 0.16, maxScale);
  }

  function updateStageScaleOnly() {
    const box = document.querySelector('#previewGrid .preview-scale-box');
    const inner = document.querySelector('#previewGrid .preview-scale-inner');
    if (!box || !inner) return;
    currentStageScale = computeStageFit(currentStageNatW, currentStageNatH, currentStageMaxScale);
    box.style.width = `${(currentStageNatW * currentStageScale).toFixed(1)}px`;
    box.style.height = `${(currentStageNatH * currentStageScale).toFixed(1)}px`;
    inner.style.transform = `scale(${currentStageScale.toFixed(4)})`;
  }

  function getActiveRoleCardEl() {
    if (state.mode === 'squad') {
      return document.querySelector(`#previewGrid [data-squad-idx="${state.squad.selectedSlot}"]`);
    }
    return el('rolePlateCard');
  }

  function updateRoleArtInPlace(cardEl = getActiveRoleCardEl(), roleObj = activeRole()) {
    const skinImg = cardEl ? cardEl.querySelector('.role-skin-img') : null;
    if (!skinImg || !roleObj) {
      renderPreview();
      return;
    }
    const m = computeRoleMetrics(roleObj);
    skinImg.style.left = `${m.artX.toFixed(2)}%`;
    skinImg.style.top = `${m.artY.toFixed(2)}%`;
    skinImg.style.width = `${m.artWidth.toFixed(2)}%`;
    persist();
  }

  function syncArtSlidersDom(tf) {
    if (el('artX')) { el('artX').value = tf.x; el('artXVal').textContent = fmtSigned(tf.x); }
    if (el('artY')) { el('artY').value = tf.y; el('artYVal').textContent = fmtSigned(tf.y); }
    if (el('artScale')) { el('artScale').value = tf.scale; el('artScaleVal').textContent = `${tf.scale}%`; }
  }

  function touchDist(t1, t2) {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  }

  function selectSquadSlotInPlace(squadIdx) {
    if (squadIdx === null || squadIdx === undefined || state.mode !== 'squad') return;
    if (state.squad.selectedSlot === squadIdx) return;
    state.squad.selectedSlot = squadIdx;
    document.querySelectorAll('#previewGrid [data-squad-idx]').forEach((node) => {
      node.classList.toggle('is-squad-selected', Number(node.dataset.squadIdx) === squadIdx);
    });
    renderFavoritesDrawer();
    renderSquadHead();
    renderRoleEditor();
    persist();
  }

  function bindRoleCanvasGesture(cardEl, roleObj, squadIdx = null) {
    if (!cardEl || !roleObj) return;
    cardEl.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      selectSquadSlotInPlace(squadIdx);
      const tf = currentArtTransform(roleObj);
      dragCtx = { startX: e.clientX, startY: e.clientY, origX: tf.x, origY: tf.y, cardEl, roleObj };
    });
    cardEl.addEventListener('wheel', (e) => {
      e.preventDefault();
      selectSquadSlotInPlace(squadIdx);
      const tf = currentArtTransform(roleObj);
      const delta = e.deltaY < 0 ? 3 : -3;
      tf.scale = clamp(tf.scale + delta, 40, 160);
      syncArtSlidersDom(tf);
      updateRoleArtInPlace(cardEl, roleObj);
    }, { passive: false });

    cardEl.addEventListener('touchstart', (e) => {
      if (state.mode !== 'role' && state.mode !== 'squad') return;
      selectSquadSlotInPlace(squadIdx);
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const tf = currentArtTransform(roleObj);
        pinchCtx = null;
        dragCtx = { startX: t.clientX, startY: t.clientY, origX: tf.x, origY: tf.y, cardEl, roleObj };
      } else if (e.touches.length >= 2) {
        e.preventDefault();
        const tf = currentArtTransform(roleObj);
        dragCtx = null;
        pinchCtx = {
          startDist: Math.max(20, touchDist(e.touches[0], e.touches[1])),
          origScale: tf.scale,
          cardEl,
          roleObj,
        };
      }
    }, { passive: false });

    cardEl.addEventListener('touchmove', (e) => {
      if (state.mode !== 'role' && state.mode !== 'squad') return;
      if (e.touches.length >= 2 && pinchCtx) {
        e.preventDefault();
        const dist = Math.max(20, touchDist(e.touches[0], e.touches[1]));
        const tf = currentArtTransform(pinchCtx.roleObj);
        tf.scale = Math.round(clamp(pinchCtx.origScale * (dist / pinchCtx.startDist), 40, 160));
        syncArtSlidersDom(tf);
        updateRoleArtInPlace(pinchCtx.cardEl, pinchCtx.roleObj);
      } else if (e.touches.length === 1 && dragCtx) {
        e.preventDefault();
        const t = e.touches[0];
        const sc = Math.max(0.2, currentStageScale);
        const tf = currentArtTransform(dragCtx.roleObj);
        const dxPct = ((t.clientX - dragCtx.startX) / (306 * sc)) * 100;
        const dyPct = ((t.clientY - dragCtx.startY) / (560 * sc)) * 100;
        tf.x = Math.round(clamp(dragCtx.origX + dxPct, -45, 45) * 2) / 2;
        tf.y = Math.round(clamp(dragCtx.origY + dyPct, -45, 45) * 2) / 2;
        syncArtSlidersDom(tf);
        updateRoleArtInPlace(dragCtx.cardEl, dragCtx.roleObj);
      }
    }, { passive: false });

    const endTouch = (e) => {
      if (!e.touches || e.touches.length === 0) {
        dragCtx = null;
        pinchCtx = null;
      } else if (e.touches.length === 1) {
        const t = e.touches[0];
        const tf = currentArtTransform(roleObj);
        pinchCtx = null;
        dragCtx = { startX: t.clientX, startY: t.clientY, origX: tf.x, origY: tf.y, cardEl, roleObj };
      }
    };
    cardEl.addEventListener('touchend', endTouch);
    cardEl.addEventListener('touchcancel', endTouch);
  }

  window.addEventListener('mousemove', (e) => {
    if (!dragCtx || (state.mode !== 'role' && state.mode !== 'squad')) return;
    const sc = Math.max(0.2, currentStageScale);
    const tf = currentArtTransform(dragCtx.roleObj);
    const dxPct = ((e.clientX - dragCtx.startX) / (306 * sc)) * 100;
    const dyPct = ((e.clientY - dragCtx.startY) / (560 * sc)) * 100;
    tf.x = Math.round(clamp(dragCtx.origX + dxPct, -45, 45) * 2) / 2;
    tf.y = Math.round(clamp(dragCtx.origY + dyPct, -45, 45) * 2) / 2;
    syncArtSlidersDom(tf);
    updateRoleArtInPlace(dragCtx.cardEl, dragCtx.roleObj);
  });
  window.addEventListener('mouseup', () => { dragCtx = null; });

  function renderRoleCardArticleHtml(r, opts = {}) {
    const { idAttr = '', extraClass = '', extraAttrs = '', extraStyle = '' } = opts;
    const m = computeRoleMetrics(r);
    const roleFont = resolveFontFamily(r.fontKey, r.customFont);
    const skinFolder = r.variant === 'full' ? FOLDERS.fullSkins : FOLDERS.halfSkins;
    const bgFitStyle = USE_EXTRACTED ? '' : 'object-fit:cover;';
    const borderFitStyle = USE_EXTRACTED ? '' : 'object-fit:contain;';

    const showAv = r.showAvatar !== false && Boolean(r.avatar);
    const textRightX306 = 306 * (1 - m.textRight / 100);
    const avRightX306 = showAv ? 306 * ((m.avatarX + m.avatarWidth / 2) / 100) + 8 : 306 * 0.13;
    const maxRoleTextW = Math.max(76, textRightX306 - avRightX306);
    const effSkinFs = measureFitFontPx(r.skinLabel, maxRoleTextW, r.skinFontSize, 10, 700, roleFont);
    const effNameFs = measureFitFontPx(r.playerName, maxRoleTextW, r.nameFontSize, 11, 800, roleFont);

    const wInfo = resolveWeaponInfo(r);
    const cInfo = resolveCoreTraitInfo(r);
    const sInfo = resolveSubTraitInfo(r);

    const weaponBadgeHtml = wInfo?.file
      ? `<span class="role-badge-weapon" title="${esc(wInfo.name)}"><img src="${assetPath(FOLDERS.weapons, wInfo.file)}" alt="${esc(wInfo.name)}"></span>`
      : `<span class="role-badge-weapon">${WEAPON_ICON_SVG}</span>`;
    const coreBadgeHtml = cInfo?.file
      ? `<span class="role-badge-trait is-real-icon" title="${esc(cInfo.name)}"><img src="${assetPath(FOLDERS.traits, cInfo.file)}" alt="${esc(cInfo.name)}"></span>`
      : `<span class="role-badge-trait ${esc(cInfo?.group || 'chaos')}"></span>`;
    const subBadgeHtml = sInfo?.file
      ? `<span class="role-badge-trait is-real-icon" title="${esc(sInfo.name)}"><img src="${assetPath(FOLDERS.traits, sInfo.file)}" alt="${esc(sInfo.name)}"></span>`
      : `<span class="role-badge-trait ${esc(r.subTrait || 'chaos')}"></span>`;

    return `<article class="role-plate-card${extraClass ? ` ${extraClass}` : ''}"${idAttr ? ` id="${idAttr}"` : ''}${extraStyle ? ` style="${extraStyle}"` : ''}${extraAttrs ? ` ${extraAttrs}` : ''}>
      <div class="role-plate-inner${r.background ? '' : ' no-bg'}">
        ${r.background ? `<img class="role-bg-img" style="${bgFitStyle}" src="${assetPath(FOLDERS.characterBackgrounds, r.background)}" alt="">` : ''}
        ${r.skin ? `<div class="role-skin-clip"><img class="role-skin-img" style="left:${m.artX.toFixed(2)}%;top:${m.artY.toFixed(2)}%;width:${m.artWidth.toFixed(2)}%" src="${assetPath(skinFolder, r.skin)}" alt=""></div>` : ''}
        ${!r.border ? '<div class="role-nameplate-bar"></div>' : ''}
      </div>
      ${r.showBadges ? `<div class="role-side-badges">${weaponBadgeHtml}${coreBadgeHtml}${subBadgeHtml}</div>` : ''}
      ${r.border ? `<img class="role-border-img" style="${borderFitStyle}" src="${assetPath(FOLDERS.borders, r.border)}" alt="">` : ''}
      ${showAv ? `<img class="role-player-avatar" style="left:${m.avatarX.toFixed(2)}%;top:${m.avatarY.toFixed(2)}%;width:${m.avatarWidth.toFixed(2)}%" src="${assetPath(FOLDERS.avatars, r.avatar)}" alt="">` : ''}
      <div class="role-text-group" style="right:${m.textRight.toFixed(2)}%;top:${m.textY.toFixed(2)}%;max-width:${maxRoleTextW.toFixed(1)}px;font-family:${esc(roleFont)}">
        <span class="role-skin-title" style="color:${esc(r.skinColor || '#78d9ff')};font-size:${effSkinFs}px">${esc(r.skinLabel)}</span>
        <strong class="role-player-name" style="font-size:${effNameFs}px">${esc(r.playerName)}</strong>
      </div>
    </article>`;
  }

  // ==================== 实时预览渲染 ====================
  function renderPreview() {
    const grid = el('previewGrid');
    const modeClass = state.mode === 'role' ? 'is-role-mode' : state.mode === 'squad' ? 'is-squad-mode' : 'is-team-mode';
    grid.className = `preview-grid ${modeClass}`;

    if (state.mode === 'role') {
      const r = state.role;
      currentStageNatW = 306;
      currentStageNatH = 560;
      currentStageMaxScale = 1.08;
      currentStageScale = computeStageFit(currentStageNatW, currentStageNatH, currentStageMaxScale);

      grid.innerHTML = `<div class="preview-scale-box" style="width:${(306 * currentStageScale).toFixed(1)}px;height:${(560 * currentStageScale).toFixed(1)}px">
        <div class="preview-scale-inner" style="width:306px;height:560px;transform:scale(${currentStageScale.toFixed(4)})">
          ${renderRoleCardArticleHtml(r, { idAttr: 'rolePlateCard' })}
        </div>
      </div>`;

      bindRoleCanvasGesture(el('rolePlateCard'), r, null);
      el('previewEyebrow').textContent = '单人角色加载界面';
      el('previewTitle').textContent = window.innerWidth <= 960
        ? '角色铭牌（单指拖立绘 · 双指缩放）'
        : '角色加载铭牌（可直接拖拽/滚轮缩放立绘）';
      el('slotSummary').textContent = r.variant === 'full' ? '全身模式' : '半身模式';
    } else if (state.mode === 'squad') {
      const sq = state.squad;
      const activeEntries = sq.members
        .map((member, idx) => ({ member, idx }))
        .filter((it) => it.member.enabled !== false);
      const count = Math.max(1, activeEntries.length);
      const stepX = 306 + sq.cardGap;
      const hasNum = Boolean(sq.squadNumber);
      const topPad = hasNum ? 52 : 0;

      currentStageNatW = Math.max(306, 306 + (count - 1) * stepX);
      currentStageNatH = 560 + topPad;
      currentStageMaxScale = 0.96;
      currentStageScale = computeStageFit(currentStageNatW, currentStageNatH, currentStageMaxScale);

      const cardsHtml = activeEntries
        .map(({ member, idx }, renderIdx) => {
          const isSel = sq.selectedSlot === idx;
          const marginStyle = renderIdx > 0 ? `margin-left:${sq.cardGap}px;z-index:${renderIdx + 2};` : 'z-index:2;';
          return renderRoleCardArticleHtml(member, {
            extraClass: `is-squad-member${isSel ? ' is-squad-selected' : ''}`,
            extraAttrs: `data-squad-idx="${idx}" title="点击选中队员 0${idx + 1}（可直接拖拽立绘）"`,
            extraStyle: marginStyle,
          });
        })
        .join('');

      grid.innerHTML = `<div class="preview-scale-box" style="width:${(currentStageNatW * currentStageScale).toFixed(1)}px;height:${(currentStageNatH * currentStageScale).toFixed(1)}px">
        <div class="preview-scale-inner" style="width:${currentStageNatW}px;height:${currentStageNatH}px;transform:scale(${currentStageScale.toFixed(4)})">
          <div class="squad-stage-wrap">
            ${hasNum ? `<div class="squad-num-watermark${sq.highlightMySquad ? ' is-my-squad' : ''}">${esc(sq.squadNumber)}</div>` : ''}
            <div class="squad-cards-row">${cardsHtml}</div>
          </div>
        </div>
      </div>`;

      activeEntries.forEach(({ member, idx }) => {
        const cardNode = grid.querySelector(`[data-squad-idx="${idx}"]`);
        bindRoleCanvasGesture(cardNode, member, idx);
      });

      el('previewEyebrow').textContent = '三人小队加载界面 · 连排预览';
      el('previewTitle').textContent = window.innerWidth <= 960
        ? '加载连排（点卡片切号位 · 直接拖立绘）'
        : '三人加载界面连排（点击任意卡片切换号位 · 直接拖拽立绘）';
      el('slotSummary').textContent = `${count} / 3 人连排`;
    } else {
      const teamFont = resolveFontFamily(state.teamFontKey, state.teamCustomFont);
      const indexedSlots = state.teamSlots
        .map((s, idx) => ({ s, idx }))
        .filter((entry) => state.showClosedTeamSlots || entry.s.enabled);
      const slotCount = Math.max(1, indexedSlots.length);
      currentStageNatW = slotCount * 282 + (slotCount - 1) * 8;
      currentStageNatH = 643;
      currentStageMaxScale = 0.95;
      currentStageScale = computeStageFit(currentStageNatW, currentStageNatH, currentStageMaxScale);

      const slotsHtml = indexedSlots
        .map(({ s, idx }) => {
          const isEditing = state.selectedTeamSlot === idx;
          if (!s.enabled) {
            return `<article class="team-lobby-slot is-closed${isEditing ? ' is-editing-slot' : ''}" data-slot-idx="${idx}" title="点击切换到号位 0${idx + 1}"><span class="closed-watermark">空槽位</span></article>`;
          }
          const tm = computeTeamMetrics(s);
          const bgAlpha = (num(s.nameBgOpacity, TEAM_SLOT_DEFAULTS.nameBgOpacity, 0, 95) / 100).toFixed(2);
          const label = s.name || '玩家';
          const effSlotFs = measureFitFontPx(label, 282 * 0.88 - 22, s.nameFontSize, 10, 700, teamFont);

          return `<article class="team-lobby-slot${isEditing ? ' is-editing-slot' : ''}" data-slot-idx="${idx}" title="点击编辑号位 0${idx + 1}">
            ${s.background ? `<img class="team-bg-img" style="${teamBgInlineStyle(s.background)}" src="${assetPath(FOLDERS.teamBackgrounds, s.background)}" alt="">` : ''}
            ${s.statusText ? `<span class="team-status-tag${s.statusBusy ? ' busy' : ''}" style="font-family:${esc(teamFont)}">${esc(s.statusText)}</span>` : ''}
            ${s.avatar ? `<div class="team-avatar-box" style="left:${tm.avX.toFixed(2)}%;top:${tm.avY.toFixed(2)}%;width:${tm.avWidthPct.toFixed(2)}%"><img src="${assetPath(FOLDERS.avatars, s.avatar)}" alt=""></div>` : ''}
            <div class="team-name-tag" style="left:${tm.nameX.toFixed(2)}%;top:${tm.nameCenterY.toFixed(2)}%;min-width:${tm.nameMinWidth.toFixed(1)}%;font-size:${effSlotFs}px;font-family:${esc(teamFont)};background:rgba(16,21,27,${bgAlpha})"><span>${esc(label)}</span></div>
          </article>`;
        })
        .join('');

      grid.innerHTML = `<div class="preview-scale-box" style="width:${(currentStageNatW * currentStageScale).toFixed(1)}px;height:${(currentStageNatH * currentStageScale).toFixed(1)}px">
        <div class="preview-scale-inner" style="width:${currentStageNatW}px;height:${currentStageNatH}px;transform:scale(${currentStageScale.toFixed(4)})">
          <div class="team-slots-row">${slotsHtml}</div>
        </div>
      </div>`;

      grid.querySelectorAll('[data-slot-idx]').forEach((cardNode) => {
        cardNode.addEventListener('click', () => {
          const nextIdx = Number(cardNode.dataset.slotIdx);
          if (state.selectedTeamSlot !== nextIdx) {
            state.selectedTeamSlot = nextIdx;
            renderTeamEditor();
            renderPreview();
          }
        });
      });

      const enabledCount = state.teamSlots.filter((s) => s.enabled).length;
      el('previewEyebrow').textContent = '组队大厅 · 一至四人队列';
      el('previewTitle').textContent = '队伍大厅';
      el('slotSummary').textContent = `${enabledCount} / 4 已启用`;
    }
    persist();
  }

  function renderControls() {
    const isRoleLike = state.mode === 'role' || state.mode === 'squad';
    el('rolePanel').hidden = !isRoleLike;
    el('teamPanel').hidden = isRoleLike;
    document.querySelectorAll('.mode-tab').forEach((b) => b.classList.toggle('active', b.dataset.mode === state.mode));

    if (isRoleLike) {
      if (el('rolePanelKicker')) {
        el('rolePanelKicker').textContent = state.mode === 'squad' ? '三人加载界面连排' : '加载界面铭牌';
      }
      if (el('rolePanelHeading')) {
        el('rolePanelHeading').textContent = state.mode === 'squad' ? '小队连排铭牌搭配' : '角色铭牌搭配';
      }
      if (el('rolePanelModeBadge')) {
        el('rolePanelModeBadge').textContent = state.mode === 'squad' ? '3人连排' : '单人';
      }
      renderFavoritesDrawer();
      renderSquadHead();
      renderRoleEditor();
    } else {
      renderTeamEditor();
    }
    const total = Object.values(ASSET).reduce((acc, arr) => acc + arr.length, 0);
    el('assetCount').textContent = `${total.toLocaleString()} 项素材${USE_EXTRACTED ? ' · 原名索引' : ' · 旧库'}`;
  }

  // ==================== 1:1 高清导出 PNG（内存 LRU 缓存 + Blob 同源防污染 + 跨平台矢量双剑） ====================
  const _imgCache = new Map();
  const IMG_CACHE_MAX = 32;

  function cachePutImg(src, img, objUrl) {
    if (_imgCache.has(src)) {
      const prev = _imgCache.get(src);
      if (prev.objUrl && prev.objUrl !== objUrl) URL.revokeObjectURL(prev.objUrl);
      _imgCache.delete(src);
    } else if (_imgCache.size >= IMG_CACHE_MAX) {
      const oldestKey = _imgCache.keys().next().value;
      const oldest = _imgCache.get(oldestKey);
      if (oldest?.objUrl) URL.revokeObjectURL(oldest.objUrl);
      _imgCache.delete(oldestKey);
    }
    _imgCache.set(src, { img, objUrl: objUrl || '' });
  }

  async function loadImg(src) {
    if (!src) return null;
    if (_imgCache.has(src)) {
      const hit = _imgCache.get(src);
      _imgCache.delete(src);
      _imgCache.set(src, hit);
      return hit.img;
    }
    // 在 http/https 下优先转本地内存 Blob URL，彻底杜绝任何 CDN 头导致的 Canvas 跨域污染
    if (location.protocol === 'http:' || location.protocol === 'https:') {
      try {
        const resp = await fetch(src);
        if (resp.ok) {
          const blob = await resp.blob();
          const objUrl = URL.createObjectURL(blob);
          const img = await new Promise((resolve) => {
            const im = new Image();
            im.onload = () => resolve(im);
            im.onerror = () => resolve(null);
            im.src = objUrl;
          });
          if (img && img.naturalWidth > 0) {
            cachePutImg(src, img, objUrl);
            return img;
          }
          URL.revokeObjectURL(objUrl);
        }
      } catch {}
    }
    return new Promise((resolve) => {
      const img = new Image();
      if (location.protocol === 'http:' || location.protocol === 'https:') {
        img.crossOrigin = 'anonymous';
      }
      img.onload = () => {
        if (img.naturalWidth > 0) {
          cachePutImg(src, img, '');
          resolve(img);
        } else {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function drawCover(ctx, img, x, y, w, h) {
    const iw = img && (img.naturalWidth || img.width);
    const ih = img && (img.naturalHeight || img.height);
    if (!iw || !ih) return;
    const scale = Math.max(w / iw, h / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  }

  function drawContain(ctx, img, x, y, w, h) {
    const iw = img && (img.naturalWidth || img.width);
    const ih = img && (img.naturalHeight || img.height);
    if (!iw || !ih) return;
    const scale = Math.min(w / iw, h / ih);
    const dw = iw * scale;
    const dh = ih * scale;
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

  function drawCrossedSwordsIcon(ctx, cx, cy, size) {
    const u = size / 24;
    const tx = (vx) => cx + (vx - 12) * u;
    const ty = (vy) => cy + (vy - 12) * u;
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.94)';
    ctx.lineWidth = Math.max(1.8, 2.1 * u);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.92)';
    ctx.shadowBlur = 3 * u;
    ctx.shadowOffsetY = 1 * u;
    ctx.beginPath();
    // 左上至右下剑
    ctx.moveTo(tx(14.5), ty(17.5));
    ctx.lineTo(tx(3), ty(6));
    ctx.lineTo(tx(3), ty(3));
    ctx.lineTo(tx(6), ty(3));
    ctx.lineTo(tx(17.5), ty(14.5));
    ctx.moveTo(tx(13), ty(19));
    ctx.lineTo(tx(19), ty(13));
    ctx.moveTo(tx(16), ty(16));
    ctx.lineTo(tx(20), ty(20));
    ctx.moveTo(tx(19), ty(21));
    ctx.lineTo(tx(21), ty(19));
    // 右上至左下剑
    ctx.moveTo(tx(9.5), ty(17.5));
    ctx.lineTo(tx(21), ty(6));
    ctx.lineTo(tx(21), ty(3));
    ctx.lineTo(tx(18), ty(3));
    ctx.lineTo(tx(6.5), ty(14.5));
    ctx.moveTo(tx(11), ty(19));
    ctx.lineTo(tx(5), ty(13));
    ctx.moveTo(tx(8), ty(16));
    ctx.lineTo(tx(4), ty(20));
    ctx.moveTo(tx(5), ty(21));
    ctx.lineTo(tx(3), ty(19));
    ctx.stroke();
    ctx.restore();
  }

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

  async function renderSingleRoleCardCanvas(r, SCALE = 2) {
    const W = 306 * SCALE;
    const H = 560 * SCALE;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d');

    const m = computeRoleMetrics(r);
    const roleFont = resolveFontFamily(r.fontKey, r.customFont);
    const skinFolder = r.variant === 'full' ? FOLDERS.fullSkins : FOLDERS.halfSkins;
    const showAv = r.showAvatar !== false && Boolean(r.avatar);
    const wInfo = r.showBadges ? resolveWeaponInfo(r) : null;
    const cInfo = r.showBadges ? resolveCoreTraitInfo(r) : null;
    const sInfo = r.showBadges ? resolveSubTraitInfo(r) : null;

    const [bg, skin, avatar, border, weaponImg, coreImg, subImg] = await Promise.all([
      loadImg(assetPath(FOLDERS.characterBackgrounds, r.background)),
      loadImg(assetPath(skinFolder, r.skin)),
      showAv ? loadImg(assetPath(FOLDERS.avatars, r.avatar)) : Promise.resolve(null),
      loadImg(assetPath(FOLDERS.borders, r.border)),
      wInfo?.file ? loadImg(assetPath(FOLDERS.weapons, wInfo.file)) : Promise.resolve(null),
      cInfo?.file ? loadImg(assetPath(FOLDERS.traits, cInfo.file)) : Promise.resolve(null),
      sInfo?.file ? loadImg(assetPath(FOLDERS.traits, sInfo.file)) : Promise.resolve(null),
    ]);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(W * 0.1036, H * 0.1094);
    ctx.lineTo(W * 0.9179, H * 0.0039);
    ctx.lineTo(W * 0.9179, H * 0.8594);
    ctx.lineTo(W * 0.1036, H * 0.9648);
    ctx.closePath();
    ctx.clip();

    if (bg) {
      if (USE_EXTRACTED) ctx.drawImage(bg, 0, 0, W, H);
      else drawCover(ctx, bg, 0, 0, W, H);
    } else {
      ctx.fillStyle = '#141920';
      ctx.fillRect(0, 0, W, H);
    }

    if (skin) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, H * 0.78);
      ctx.clip();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 12 * SCALE;
      ctx.shadowOffsetY = 6 * SCALE;
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
      const bx = W * 0.142 + 13 * SCALE;
      const by = H * 0.138;
      if (weaponImg) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.92)';
        ctx.shadowBlur = 3 * SCALE;
        ctx.shadowOffsetY = 1 * SCALE;
        drawContain(ctx, weaponImg, bx - 9 * SCALE, by + 2 * SCALE, 18 * SCALE, 18 * SCALE);
        ctx.restore();
      } else {
        drawCrossedSwordsIcon(ctx, bx, by + 11 * SCALE, 15 * SCALE);
      }
      if (coreImg) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.82)';
        ctx.shadowBlur = 5 * SCALE;
        ctx.shadowOffsetY = 2 * SCALE;
        drawContain(ctx, coreImg, bx - 13 * SCALE, by + 28 * SCALE, 26 * SCALE, 26 * SCALE);
        ctx.restore();
      } else {
        drawTraitCircle(ctx, bx, by + 41 * SCALE, 12.5 * SCALE, cInfo?.group || 'chaos');
      }
      if (subImg) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.82)';
        ctx.shadowBlur = 5 * SCALE;
        ctx.shadowOffsetY = 2 * SCALE;
        drawContain(ctx, subImg, bx - 13 * SCALE, by + 60 * SCALE, 26 * SCALE, 26 * SCALE);
        ctx.restore();
      } else {
        drawTraitCircle(ctx, bx, by + 73 * SCALE, 12.5 * SCALE, r.subTrait || 'chaos');
      }
    }

    if (border) {
      if (USE_EXTRACTED) ctx.drawImage(border, 0, 0, W, H);
      else drawContain(ctx, border, 0, 0, W, H);
    }

    if (avatar && showAv) {
      const avSize = W * (m.avatarWidth / 100);
      const avX = W * (m.avatarX / 100) - avSize / 2;
      const avY = H * (m.avatarY / 100) - avSize / 2;
      ctx.fillStyle = '#0f1318';
      ctx.fillRect(avX, avY, avSize, avSize);
      drawCover(ctx, avatar, avX, avY, avSize, avSize);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(avX + 1, avY + 1, avSize - 2, avSize - 2);
    }

    const textRightX = W * (1 - m.textRight / 100);
    const avRightEdge = showAv ? W * ((m.avatarX + m.avatarWidth / 2) / 100) + 8 * SCALE : W * 0.13;
    const maxRoleTextW = Math.max(76 * SCALE, textRightX - avRightEdge);
    const centerY = H * (m.textY / 100);
    const skinPx = measureFitFontPx(r.skinLabel, maxRoleTextW, r.skinFontSize * SCALE, 10 * SCALE, 700, roleFont);
    const namePx = measureFitFontPx(r.playerName, maxRoleTextW, r.nameFontSize * SCALE, 11 * SCALE, 800, roleFont);
    // 严格按 CSS 行高盒模型 (1.25 + 3px margin + 1.2) 计算双行文字中心 Y，与实时预览 0 像素误差
    const skinLineH = skinPx * 1.25;
    const nameLineH = namePx * 1.2;
    const lineGap = 3 * SCALE;
    const totalTextH = skinLineH + lineGap + nameLineH;
    const blockTop = centerY - totalTextH / 2;

    ctx.save();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.95)';
    ctx.shadowBlur = 8;
    ctx.font = `700 ${skinPx}px ${roleFont}`;
    ctx.fillStyle = r.skinColor || '#78d9ff';
    ctx.fillText(r.skinLabel || '', textRightX, blockTop + skinLineH / 2);

    ctx.font = `800 ${namePx}px ${roleFont}`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(r.playerName || '', textRightX, blockTop + skinLineH + lineGap + nameLineH / 2);
    ctx.restore();

    return c;
  }

  async function buildExportCanvas() {
    // 最多等待字体 600ms，防止国内网络访问 Google Fonts 缓慢时卡死导出按钮
    if (document.fonts && document.fonts.ready) {
      await Promise.race([
        document.fonts.ready.catch(() => {}),
        new Promise((r) => setTimeout(r, 600)),
      ]);
    }

    if (state.mode === 'role') {
      return renderSingleRoleCardCanvas(state.role, 2);
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (state.mode === 'squad') {
      const sq = state.squad;
      const activeMembers = sq.members.filter((m) => m.enabled !== false);
      if (!activeMembers.length) {
        showToast('请至少启用 1 名加载连排队员');
        return null;
      }
      const SCALE = 2;
      const hasNum = Boolean(sq.squadNumber);
      const topPad = hasNum ? 52 * SCALE : 0;
      const stepX = (306 + sq.cardGap) * SCALE;
      canvas.width = Math.max(306 * SCALE, 306 * SCALE + (activeMembers.length - 1) * stepX);
      canvas.height = 560 * SCALE + topPad;

      if (hasNum) {
        ctx.save();
        ctx.font = `900 ${68 * SCALE}px "Orbitron", "Bahnschrift", "Impact", "Segoe UI", sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        if (sq.highlightMySquad) {
          ctx.fillStyle = '#46b5d1';
          ctx.shadowColor = 'rgba(70, 181, 209, 0.32)';
          ctx.shadowBlur = 14 * SCALE;
          ctx.shadowOffsetY = 3 * SCALE;
        } else {
          ctx.fillStyle = 'rgba(100, 116, 139, 0.42)';
        }
        ctx.fillText(sq.squadNumber, 28 * SCALE, 2 * SCALE);
        ctx.restore();
      }

      const cardCanvases = await Promise.all(activeMembers.map((member) => renderSingleRoleCardCanvas(member, SCALE)));
      cardCanvases.forEach((cardCanvas, idx) => {
        ctx.save();
        if (idx > 0 && sq.cardGap < 0) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.42)';
          ctx.shadowBlur = 16 * SCALE;
          ctx.shadowOffsetX = -4 * SCALE;
          ctx.shadowOffsetY = 6 * SCALE;
        }
        ctx.drawImage(cardCanvas, idx * stepX, topPad);
        ctx.restore();
      });
      return canvas;
    } else {
      const slots = state.teamSlots.filter((s) => s.enabled);
      if (!slots.length) { showToast('请至少启用 1 个队伍槽位'); return null; }
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

        // 槽位实机暗底（保证半透明默认队伍格背景与实机一致）
        ctx.fillStyle = '#12171f';
        ctx.fillRect(ox, 0, sw, sh);

        if (bg) {
          const c = getTeamBgCrop(s.background, bg.naturalWidth, bg.naturalHeight);
          ctx.drawImage(bg, c.x0, c.y0, c.cw, c.ch, ox, 0, sw, sh);
        }

        if (s.statusText) {
          const stColor = s.statusBusy ? '#38bdf8' : '#65f77b';
          const stFontPx = Math.round(11.5 * SCALE);
          const sq = Math.round(6 * SCALE);
          const stX = ox + sw * 0.045;
          const stMidY = sh * 0.034 + stFontPx / 2;
          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.9)';
          ctx.shadowBlur = 3 * SCALE;
          ctx.fillStyle = stColor;
          ctx.fillRect(stX, stMidY - sq / 2, sq, sq);
          ctx.font = `700 ${stFontPx}px ${teamFont}`;
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'left';
          ctx.fillText(s.statusText, stX + sq + Math.round(5 * SCALE), stMidY);
          ctx.restore();
        }

        const avSize = sw * (tm.avWidthPct / 100);
        const cx = ox + sw * (tm.avX / 100);
        const cy = sh * (tm.avY / 100);
        if (av) {
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.38)';
          ctx.shadowBlur = 12 * SCALE;
          ctx.shadowOffsetY = 3 * SCALE;
          ctx.fillStyle = '#0f1318';
          ctx.fillRect(cx - avSize / 2, cy - avSize / 2, avSize, avSize);
          ctx.restore();
          ctx.save();
          ctx.beginPath();
          ctx.rect(cx - avSize / 2, cy - avSize / 2, avSize, avSize);
          ctx.clip();
          drawCover(ctx, av, cx - avSize / 2, cy - avSize / 2, avSize, avSize);
          ctx.restore();
        }

        const label = s.name || '玩家';
        const padX = Math.round(11 * SCALE);
        const maxBoxW = sw * 0.88;
        const fontPx = measureFitFontPx(label, maxBoxW - padX * 2, Math.round(s.nameFontSize * SCALE), Math.round(10 * SCALE), 700, teamFont);
        ctx.font = `700 ${fontPx}px ${teamFont}`;
        const boxH = Math.max(Math.round(sh * 0.048), Math.round(fontPx + 8 * SCALE));
        const minBoxW = sw * (tm.nameMinWidth / 100);
        const boxW = Math.min(maxBoxW, Math.max(minBoxW, ctx.measureText(label).width + padX * 2));

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
    return canvas;
  }

  function canvasToPngBlob(canvas) {
    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
            return;
          }
          try {
            const dataUrl = canvas.toDataURL('image/png');
            const bin = atob(dataUrl.split(',')[1] || '');
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
            resolve(new Blob([bytes], { type: 'image/png' }));
          } catch (e2) {
            reject(e2);
          }
        }, 'image/png');
      } catch (err) {
        reject(err);
      }
    });
  }

  function handleExportError(err) {
    console.error('Export PNG failed:', err);
    if (location.protocol === 'file:') {
      showToast('浏览器安全策略禁止 file:// 直接导出画布！请使用线上网址 er-plate.pages.dev 或双击「本地启动网页.bat」');
    } else {
      showToast(`导出失败：${err?.message || '请刷新页面后重试'}`);
    }
  }

  async function exportPng() {
    const btn = el('exportButton');
    const origHtml = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.textContent = '合成中…'; }
    try {
      const canvas = await buildExportCanvas();
      if (!canvas) return;
      const blob = await canvasToPngBlob(canvas);
      // 微信 / 手机 QQ 内置浏览器会拦截 <a download>，自动弹出长按保存原图窗口
      if (isInAppWebView()) {
        openRawPngModal(canvas, blob);
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      const modeName = state.mode === 'role' ? '角色铭牌' : state.mode === 'squad' ? '三人加载连排' : '队伍大厅';
      a.download = `卢米亚铭牌工坊-${modeName}.png`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => a.remove(), 300);
      // 保留 60 秒以兼容开启了“每次下载前询问保存位置”弹窗的浏览器
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      showToast('高清 PNG 已导出');
    } catch (err) {
      handleExportError(err);
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = origHtml; }
    }
  }

  async function copyPng() {
    const btn = el('copyButton');
    const origText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = '复制中…'; }
    try {
      const canvas = await buildExportCanvas();
      if (!canvas) return;
      const blob = await canvasToPngBlob(canvas);
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        showToast('已复制高清透明 PNG 到剪贴板，可直接粘贴到 QQ / 微信！');
      } else {
        showToast('当前浏览器不支持剪贴板写入图片，请点击右侧“导出高清 PNG”');
      }
    } catch (err) {
      handleExportError(err);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = origText; }
    }
  }

  // ==================== 一键生成铭牌搭配分享图（含缩略图与装扮名称清单） ====================
  const TRAIT_LABELS = {
    havoc: '破坏红',
    chaos: '混沌紫',
    fort: '抵抗蓝',
    support: '支援绿',
  };

  function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.rect(x, y, w, h);
    }
  }

  function fontDisplayLabel(fontKey, customFont) {
    if (fontKey === 'custom') {
      const cleaned = String(customFont || '').trim();
      return cleaned ? `本机字体（${cleaned}）` : '默认雅黑';
    }
    const hit = FONT_PRESETS.find((f) => f.key === fontKey);
    return hit ? hit.label.replace(/（.+?）$/, '') : '默认雅黑';
  }

  function prettyItemName(file, fallback = '未选择') {
    if (!file) return fallback;
    const zh = rawZhLabel(file);
    return (zh || stripExt(file) || fallback).trim();
  }

  function drawClippedThumb(ctx, img, x, y, w, h, r, fitMode = 'cover', backing = '#141b24', strokeColor = 'rgba(148,163,184,0.28)') {
    ctx.save();
    roundRectPath(ctx, x, y, w, h, r);
    ctx.fillStyle = backing;
    ctx.fill();
    ctx.clip();
    const iw = img && (img.naturalWidth || img.width);
    const ih = img && (img.naturalHeight || img.height);
    if (iw && ih) {
      if (fitMode === 'border') {
        const sy = ih * 0.44;
        const sH = ih * 0.56;
        const scale = Math.min((w - 6) / iw, (h - 6) / sH);
        const dw = iw * scale;
        const dh = sH * scale;
        ctx.drawImage(img, 0, sy, iw, sH, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
      } else if (fitMode === 'contain') {
        drawContain(ctx, img, x + 4, y + 4, w - 8, h - 8);
      } else if (fitMode === 'teamBg') {
        const sx = iw * (8 / 322);
        const sW = iw * (282 / 322);
        const sH = ih * (643 / 684);
        const scale = Math.max(w / sW, h / sH);
        const dw = sW * scale;
        const dh = sH * scale;
        ctx.drawImage(img, sx, 0, sW, sH, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
      } else {
        drawCover(ctx, img, x, y, w, h);
      }
    }
    ctx.restore();
    ctx.save();
    roundRectPath(ctx, x, y, w, h, r);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  function drawFitSingleLine(ctx, text, x, y, maxW, basePx, minPx, weight, family, color, align = 'left') {
    const str = String(text || '');
    ctx.save();
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    let px = basePx;
    ctx.font = `${weight} ${px}px ${family}`;
    while (px > minPx && ctx.measureText(str).width > maxW) {
      px -= 0.5;
      ctx.font = `${weight} ${px}px ${family}`;
    }
    let out = str;
    if (ctx.measureText(out).width > maxW) {
      while (out.length > 1 && ctx.measureText(`${out}…`).width > maxW) {
        out = out.slice(0, -1);
      }
      out = `${out}…`;
    }
    ctx.fillText(out, x, y);
    ctx.restore();
  }

  function drawWrappedLines(ctx, text, x, y, maxW, lineH, maxLines, weight, px, family, color) {
    const chars = Array.from(String(text || ''));
    ctx.save();
    ctx.font = `${weight} ${px}px ${family}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const lines = [];
    let cur = '';
    for (let i = 0; i < chars.length; i += 1) {
      const next = cur + chars[i];
      if (ctx.measureText(next).width > maxW && cur.length > 0) {
        lines.push(cur);
        cur = chars[i];
        if (lines.length >= maxLines) break;
      } else {
        cur = next;
      }
    }
    if (lines.length < maxLines && cur) {
      lines.push(cur);
    } else if (lines.length === maxLines && cur) {
      let last = lines[maxLines - 1];
      while (last.length > 1 && ctx.measureText(`${last}…`).width > maxW) {
        last = last.slice(0, -1);
      }
      lines[maxLines - 1] = `${last}…`;
    }
    lines.forEach((ln, idx) => {
      ctx.fillText(ln, x, y + idx * lineH);
    });
    ctx.restore();
  }

  function sharePalette(cardTheme) {
    if (cardTheme === 'dark') {
      return {
        bgTop: '#0d131c',
        bgBot: '#131c28',
        glow: 'rgba(20, 184, 166, 0.16)',
        stageFill: 'rgba(255, 255, 255, 0.03)',
        stageStroke: 'rgba(148, 163, 184, 0.14)',
        cardFill: 'rgba(24, 34, 48, 0.88)',
        cardStroke: 'rgba(148, 163, 184, 0.16)',
        pillFill: 'rgba(20, 184, 166, 0.16)',
        pillText: '#2dd4bf',
        stripFill: 'rgba(15, 23, 34, 0.78)',
        title: '#f8fafc',
        sub: '#94a3b8',
        dim: '#64748b',
        accent: '#2dd4bf',
        thumbBack: '#0b1017',
        thumbStroke: 'rgba(148, 163, 184, 0.28)',
      };
    }
    return {
      bgTop: '#f6f9fc',
      bgBot: '#eaf0f7',
      glow: 'rgba(13, 148, 136, 0.12)',
      stageFill: 'rgba(255, 255, 255, 0.72)',
      stageStroke: 'rgba(15, 23, 42, 0.08)',
      cardFill: '#ffffff',
      cardStroke: 'rgba(15, 23, 42, 0.08)',
      pillFill: 'rgba(13, 148, 136, 0.11)',
      pillText: '#0f766e',
      stripFill: 'rgba(255, 255, 255, 0.82)',
      title: '#0f172a',
      sub: '#475569',
      dim: '#64748b',
      accent: '#0d9488',
      thumbBack: '#161f2c',
      thumbStroke: 'rgba(15, 23, 42, 0.12)',
    };
  }

  async function buildShareCardCanvas(cardTheme = state.theme) {
    const plateCanvas = await buildExportCanvas();
    if (!plateCanvas) return null;

    const uiFont = '"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
    const pal = sharePalette(cardTheme);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (state.mode === 'role') {
      const W = 1360;
      const H = 860;
      canvas.width = W;
      canvas.height = H;

      // 背景渐变 + 柔和光晕 + 细网格装饰
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, pal.bgTop);
      bgGrad.addColorStop(1, pal.bgBot);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      const radGlow = ctx.createRadialGradient(275, 420, 30, 275, 420, 360);
      radGlow.addColorStop(0, pal.glow);
      radGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radGlow;
      ctx.fillRect(0, 0, 620, H);

      // 左侧成品展示台背板
      ctx.save();
      roundRectPath(ctx, 48, 46, 454, 768, 22);
      ctx.fillStyle = pal.stageFill;
      ctx.fill();
      ctx.strokeStyle = pal.stageStroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // 绘制左侧 1:1 成品角色铭牌
      ctx.save();
      ctx.shadowColor = cardTheme === 'dark' ? 'rgba(0,0,0,0.62)' : 'rgba(15,23,42,0.24)';
      ctx.shadowBlur = 32;
      ctx.shadowOffsetY = 12;
      drawContain(ctx, plateCanvas, 74, 72, 402, 716);
      ctx.restore();

      // 加载右侧清单缩略图
      const r = state.role;
      const [charThumb, borderThumb, bgThumb, avThumb] = await Promise.all([
        loadImg(assetPath(FOLDERS.characterPortraits, r.character)),
        loadImg(assetPath(FOLDERS.borders, r.border)),
        loadImg(assetPath(FOLDERS.characterBackgrounds, r.background)),
        loadImg(assetPath(FOLDERS.avatars, r.avatar)),
      ]);

      const rx = 536;
      const rw = 776;
      const charZh = characterDisplayName(r.characterKey) || '未知实验体';
      const skinPure = isDefaultSkinFile(r.skin)
        ? '默认原皮'
        : cleanDisplayLabel(r.skin, 'skin') || charZh;
      const variantLabel = r.variant === 'full' ? '全身立绘' : '半身立绘';
      const fontLabel = fontDisplayLabel(r.fontKey, r.customFont);

      // 顶部标签胶囊
      ctx.save();
      roundRectPath(ctx, rx, 52, 232, 32, 8);
      ctx.fillStyle = pal.pillFill;
      ctx.fill();
      ctx.font = `800 14px ${uiFont}`;
      ctx.fillStyle = pal.pillText;
      ctx.textBaseline = 'middle';
      ctx.fillText('永恒轮回 · 角色铭牌搭配单', rx + 14, 68);
      ctx.restore();

      // 主标题 & 副信息
      drawFitSingleLine(
        ctx,
        `${charZh} · ${skinPure}（${variantLabel}）`,
        rx,
        118,
        rw,
        32,
        20,
        800,
        uiFont,
        pal.title
      );
      drawFitSingleLine(
        ctx,
        `玩家昵称：${r.playerName || '—'}   ｜   铭牌头衔：${r.skinLabel || charZh}   ｜   字体：${fontLabel}`,
        rx,
        156,
        rw,
        16.5,
        13,
        600,
        uiFont,
        pal.sub
      );

      // 四大装扮条目卡片
      const items = [
        {
          tag: '实验体与立绘皮肤',
          name: `${charZh} — ${skinPure}`,
          desc: `模式：${variantLabel}`,
          img: charThumb,
          fit: 'cover',
        },
        {
          tag: '铭牌边框',
          name: prettyItemName(r.border, '默认无边框'),
          desc: '加载界面外框装饰',
          img: borderThumb,
          fit: 'border',
        },
        {
          tag: '人物背景板',
          name: prettyItemName(r.background, '默认底板'),
          desc: '加载界面角色底图',
          img: bgThumb,
          fit: 'cover',
        },
        {
          tag: '左下玩家头像',
          name: r.showAvatar === false ? `${prettyItemName(r.avatar, '未选择头像')}（当前已隐藏）` : prettyItemName(r.avatar, '未选择头像'),
          desc: r.showAvatar === false ? '已在铭牌上关闭左下角头像显示' : '铭牌左下角佩戴头像',
          img: avThumb,
          fit: 'cover',
        },
      ];

      items.forEach((it, idx) => {
        const cy = 186 + idx * 120;
        const ch = 106;
        ctx.save();
        ctx.shadowColor = cardTheme === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(15,23,42,0.05)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 3;
        roundRectPath(ctx, rx, cy, rw, ch, 14);
        ctx.fillStyle = pal.cardFill;
        ctx.fill();
        ctx.restore();

        ctx.save();
        roundRectPath(ctx, rx, cy, rw, ch, 14);
        ctx.strokeStyle = pal.cardStroke;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        drawClippedThumb(ctx, it.img, rx + 14, cy + 12, 82, 82, 10, it.fit, pal.thumbBack, pal.thumbStroke);

        ctx.save();
        ctx.font = `800 13.5px ${uiFont}`;
        ctx.fillStyle = pal.accent;
        ctx.textBaseline = 'middle';
        ctx.fillText(it.tag, rx + 114, cy + 30);
        ctx.restore();

        drawFitSingleLine(ctx, it.name, rx + 114, cy + 60, rw - 134, 23, 15, 800, uiFont, pal.title);
        drawFitSingleLine(ctx, it.desc, rx + 114, cy + 86, rw - 134, 13.5, 12, 600, uiFont, pal.dim);
      });

      // 底部细节参数条
      const tf = currentArtTransform(r);
      const tfMoved = tf.x !== 0 || tf.y !== 0 || tf.scale !== 100;
      const tfDesc = tfMoved
        ? `缩放 ${tf.scale}% · X ${fmtSigned(tf.x)} · Y ${fmtSigned(tf.y)}`
        : '默认校准原点';
      const wInfo = resolveWeaponInfo(r);
      const cInfo = resolveCoreTraitInfo(r);
      const sInfo = resolveSubTraitInfo(r);
      const badgeDesc = r.showBadges
        ? `${wInfo?.name || '默认武器'} · ${cInfo?.name || '核心'} + ${sInfo?.name || '副系'}`
        : '隐藏';

      ctx.save();
      roundRectPath(ctx, rx, 674, rw, 52, 12);
      ctx.fillStyle = pal.stripFill;
      ctx.fill();
      ctx.strokeStyle = pal.cardStroke;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      drawFitSingleLine(
        ctx,
        `武器与潜能：${badgeDesc}   ｜   立绘坐标：${tfDesc}   ｜   字号：${r.nameFontSize}/${r.skinFontSize}px`,
        rx + 18,
        700,
        rw - 36,
        14.5,
        12,
        600,
        uiFont,
        pal.sub
      );

      // 底部品牌水印栏
      ctx.save();
      ctx.strokeStyle = pal.cardStroke;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rx, 756);
      ctx.lineTo(rx + rw, 756);
      ctx.stroke();

      ctx.font = `800 16px ${uiFont}`;
      ctx.fillStyle = pal.title;
      ctx.textBaseline = 'middle';
      ctx.fillText('卢米亚铭牌工坊', rx, 788);

      ctx.font = `600 14px ${uiFont}`;
      ctx.fillStyle = pal.dim;
      ctx.fillText('· 永恒轮回铭牌与大厅搭配工具', rx + 122, 788);

      ctx.textAlign = 'right';
      ctx.font = `700 15px ${uiFont}`;
      ctx.fillStyle = pal.accent;
      ctx.fillText('er-plate.pages.dev', rx + rw, 788);
      ctx.restore();
    } else if (state.mode === 'squad') {
      // 三人加载界面连排搭配分享图
      const sq = state.squad;
      const members = sq.members.filter((m) => m.enabled !== false);
      const W = 1440;
      const H = 1120;
      canvas.width = W;
      canvas.height = H;

      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, pal.bgTop);
      bgGrad.addColorStop(1, pal.bgBot);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      const radGlow = ctx.createRadialGradient(W / 2, 380, 40, W / 2, 380, 540);
      radGlow.addColorStop(0, pal.glow);
      radGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radGlow;
      ctx.fillRect(0, 0, W, 720);

      const padX = 52;
      const contentW = W - padX * 2;

      ctx.save();
      roundRectPath(ctx, padX, 40, 256, 30, 8);
      ctx.fillStyle = pal.pillFill;
      ctx.fill();
      ctx.font = `800 13.5px ${uiFont}`;
      ctx.fillStyle = pal.pillText;
      ctx.textBaseline = 'middle';
      ctx.fillText('永恒轮回 · 三人加载连排搭配单', padX + 14, 55);
      ctx.restore();

      const sqTitle = sq.squadNumber ? `小队 #${sq.squadNumber} · ${members.length} 人加载界面铭牌连排` : `${members.length} 人加载界面铭牌连排搭配清单`;
      drawFitSingleLine(ctx, sqTitle, padX, 98, contentW * 0.68, 28, 20, 800, uiFont, pal.title);
      drawFitSingleLine(ctx, `紧凑连排间距：${sq.cardGap}px`, W - padX, 98, contentW * 0.3, 15.5, 12.5, 600, uiFont, pal.sub, 'right');

      ctx.save();
      roundRectPath(ctx, padX, 128, contentW, 560, 20);
      ctx.fillStyle = pal.stageFill;
      ctx.fill();
      ctx.strokeStyle = pal.stageStroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.shadowColor = cardTheme === 'dark' ? 'rgba(0,0,0,0.62)' : 'rgba(15,23,42,0.22)';
      ctx.shadowBlur = 28;
      ctx.shadowOffsetY = 10;
      drawContain(ctx, plateCanvas, padX + 24, 144, contentW - 48, 528);
      ctx.restore();

      const gap = 18;
      const rawCardW = (contentW - gap * (members.length - 1)) / members.length;
      const cardW = Math.min(440, rawCardW);
      const totalW = cardW * members.length + gap * (members.length - 1);
      const startX = (W - totalW) / 2;
      const cardY = 710;
      const cardH = 336;

      const memberThumbs = await Promise.all(
        members.map((m) =>
          Promise.all([
            loadImg(assetPath(FOLDERS.characterPortraits, m.character)),
            loadImg(assetPath(FOLDERS.borders, m.border)),
            loadImg(assetPath(FOLDERS.characterBackgrounds, m.background)),
            loadImg(assetPath(FOLDERS.avatars, m.avatar)),
          ])
        )
      );

      members.forEach((m, idx) => {
        const cx = startX + idx * (cardW + gap);
        const [charImg, bdImg, bgImg, avImg] = memberThumbs[idx];
        const cZh = characterDisplayName(m.characterKey) || '实验体';
        const sPure = isDefaultSkinFile(m.skin) ? '原皮' : cleanDisplayLabel(m.skin, 'skin') || cZh;
        const wInf = resolveWeaponInfo(m);
        const cInf = resolveCoreTraitInfo(m);
        const sInf = resolveSubTraitInfo(m);

        ctx.save();
        roundRectPath(ctx, cx, cardY, cardW, cardH, 16);
        ctx.fillStyle = pal.cardFill;
        ctx.fill();
        ctx.strokeStyle = pal.cardStroke;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        roundRectPath(ctx, cx + 16, cardY + 14, 68, 25, 6);
        ctx.fillStyle = pal.pillFill;
        ctx.fill();
        ctx.font = `800 12px ${uiFont}`;
        ctx.fillStyle = pal.pillText;
        ctx.textBaseline = 'middle';
        ctx.fillText(`队员 0${idx + 1}`, cx + 25, cardY + 26.5);
        ctx.restore();

        drawFitSingleLine(ctx, `${m.playerName || '玩家'} · ${cZh}`, cx + 92, cardY + 26.5, cardW - 108, 17, 13, 800, uiFont, pal.title);

        const rows = [
          { tag: '皮肤', val: `${cZh} — ${sPure}`, img: charImg, fit: 'cover' },
          { tag: '边框', val: prettyItemName(m.border, '默认无边框'), img: bdImg, fit: 'border' },
          { tag: '背景', val: prettyItemName(m.background, '默认底板'), img: bgImg, fit: 'cover' },
          { tag: '头像', val: m.showAvatar === false ? '已隐藏' : prettyItemName(m.avatar, '未选择'), img: avImg, fit: 'cover' },
        ];
        rows.forEach((rwItem, rIdx) => {
          const ry = cardY + 52 + rIdx * 60;
          drawClippedThumb(ctx, rwItem.img, cx + 16, ry, 48, 48, 8, rwItem.fit, pal.thumbBack, pal.thumbStroke);
          ctx.save();
          ctx.font = `800 11.5px ${uiFont}`;
          ctx.fillStyle = pal.accent;
          ctx.textBaseline = 'middle';
          ctx.fillText(rwItem.tag, cx + 74, ry + 14);
          ctx.restore();
          drawFitSingleLine(ctx, rwItem.val, cx + 74, ry + 34, cardW - 90, 14.5, 11.5, 700, uiFont, pal.title);
        });

        const badgeLine = m.showBadges
          ? `武器：${wInf?.name || '—'}  ｜  潜能：${cInf?.name || '—'} + ${sInf?.name || '—'}`
          : '左上角武器与潜能图标：已隐藏';
        drawFitSingleLine(ctx, badgeLine, cx + 16, cardY + 312, cardW - 32, 12, 10.5, 600, uiFont, pal.dim);
      });

      ctx.save();
      ctx.font = `800 16px ${uiFont}`;
      ctx.fillStyle = pal.title;
      ctx.textBaseline = 'middle';
      ctx.fillText('卢米亚铭牌工坊', padX, 1082);
      ctx.font = `600 14px ${uiFont}`;
      ctx.fillStyle = pal.dim;
      ctx.fillText('· 永恒轮回铭牌与大厅搭配工具', padX + 122, 1082);
      ctx.textAlign = 'right';
      ctx.font = `700 15px ${uiFont}`;
      ctx.fillStyle = pal.accent;
      ctx.fillText('er-plate.pages.dev', W - padX, 1082);
      ctx.restore();
    } else {
      // 队伍大厅搭配分享图
      const slots = state.teamSlots.filter((s) => s.enabled);
      const W = 1400;
      const H = 1080;
      canvas.width = W;
      canvas.height = H;

      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, pal.bgTop);
      bgGrad.addColorStop(1, pal.bgBot);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      const radGlow = ctx.createRadialGradient(W / 2, 390, 40, W / 2, 390, 520);
      radGlow.addColorStop(0, pal.glow);
      radGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radGlow;
      ctx.fillRect(0, 0, W, 720);

      const padX = 56;
      const contentW = W - padX * 2;
      const teamFontLabel = fontDisplayLabel(state.teamFontKey, state.teamCustomFont);

      // 顶部标题栏
      ctx.save();
      roundRectPath(ctx, padX, 42, 236, 30, 8);
      ctx.fillStyle = pal.pillFill;
      ctx.fill();
      ctx.font = `800 13.5px ${uiFont}`;
      ctx.fillStyle = pal.pillText;
      ctx.textBaseline = 'middle';
      ctx.fillText('永恒轮回 · 队伍大厅搭配单', padX + 14, 57);
      ctx.restore();

      drawFitSingleLine(
        ctx,
        `组队准备大厅 · ${slots.length} 人小队搭配清单`,
        padX,
        102,
        contentW * 0.65,
        28,
        20,
        800,
        uiFont,
        pal.title
      );
      drawFitSingleLine(
        ctx,
        `全队统一名字牌字体：${teamFontLabel}`,
        W - padX,
        102,
        contentW * 0.34,
        16,
        13,
        600,
        uiFont,
        pal.sub,
        'right'
      );

      // 上半部分大厅实机预览区
      ctx.save();
      roundRectPath(ctx, padX, 132, contentW, 536, 20);
      ctx.fillStyle = pal.stageFill;
      ctx.fill();
      ctx.strokeStyle = pal.stageStroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.shadowColor = cardTheme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(15,23,42,0.22)';
      ctx.shadowBlur = 28;
      ctx.shadowOffsetY = 10;
      drawContain(ctx, plateCanvas, padX + 24, 152, contentW - 48, 496);
      ctx.restore();

      // 下半部分各槽位装扮明细卡
      const gap = 16;
      const maxCardW = 390;
      const rawCardW = (contentW - gap * (slots.length - 1)) / slots.length;
      const cardW = Math.min(maxCardW, rawCardW);
      const totalCardsW = cardW * slots.length + gap * (slots.length - 1);
      const startX = (W - totalCardsW) / 2;
      const cardY = 692;
      const cardH = 308;

      const slotThumbs = await Promise.all(
        slots.map((s) =>
          Promise.all([
            loadImg(assetPath(FOLDERS.avatars, s.avatar)),
            loadImg(assetPath(FOLDERS.teamBackgrounds, s.background)),
          ])
        )
      );

      slots.forEach((s, i) => {
        const cx = startX + i * (cardW + gap);
        const [avImg, bgImg] = slotThumbs[i];

        ctx.save();
        roundRectPath(ctx, cx, cardY, cardW, cardH, 16);
        ctx.fillStyle = pal.cardFill;
        ctx.fill();
        ctx.strokeStyle = pal.cardStroke;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // 槽位头栏
        ctx.save();
        roundRectPath(ctx, cx + 16, cardY + 16, 68, 26, 6);
        ctx.fillStyle = pal.pillFill;
        ctx.fill();
        ctx.font = `800 12.5px ${uiFont}`;
        ctx.fillStyle = pal.pillText;
        ctx.textBaseline = 'middle';
        ctx.fillText(`0${i + 1} 号位`, cx + 26, cardY + 29);
        ctx.restore();

        drawFitSingleLine(ctx, s.name || `玩家 0${i + 1}`, cx + 94, cardY + 29, cardW - 110, 18, 14, 800, uiFont, pal.title);

        ctx.save();
        ctx.strokeStyle = pal.cardStroke;
        ctx.beginPath();
        ctx.moveTo(cx + 16, cardY + 54);
        ctx.lineTo(cx + cardW - 16, cardY + 54);
        ctx.stroke();
        ctx.restore();

        // 1. 玩家头像行
        const r1Y = cardY + 72;
        drawClippedThumb(ctx, avImg, cx + 16, r1Y, 64, 64, 10, 'cover', pal.thumbBack, pal.thumbStroke);
        ctx.save();
        ctx.font = `800 12.5px ${uiFont}`;
        ctx.fillStyle = pal.accent;
        ctx.textBaseline = 'top';
        ctx.fillText('玩家头像', cx + 92, r1Y + 2);
        ctx.restore();
        drawWrappedLines(ctx, prettyItemName(s.avatar, '未选择头像'), cx + 92, r1Y + 22, cardW - 108, 21, 2, 700, 15.5, uiFont, pal.title);

        // 2. 队伍格背景行
        const r2Y = cardY + 162;
        drawClippedThumb(ctx, bgImg, cx + 16, r2Y, 64, 88, 10, 'teamBg', pal.thumbBack, pal.thumbStroke);
        ctx.save();
        ctx.font = `800 12.5px ${uiFont}`;
        ctx.fillStyle = pal.accent;
        ctx.textBaseline = 'top';
        ctx.fillText('队伍格背景', cx + 92, r2Y + 4);
        ctx.restore();
        drawWrappedLines(ctx, prettyItemName(s.background, '默认队伍格背景'), cx + 92, r2Y + 26, cardW - 108, 21, 3, 700, 15.5, uiFont, pal.title);

        // 字号小标
        drawFitSingleLine(ctx, `字号 ${s.nameFontSize}px · 底框透 ${s.nameBgOpacity}%`, cx + 16, cardY + 280, cardW - 32, 12.5, 11, 600, uiFont, pal.dim);
      });

      // 底部水印栏
      ctx.save();
      ctx.font = `800 16px ${uiFont}`;
      ctx.fillStyle = pal.title;
      ctx.textBaseline = 'middle';
      ctx.fillText('卢米亚铭牌工坊', padX, 1040);

      ctx.font = `600 14px ${uiFont}`;
      ctx.fillStyle = pal.dim;
      ctx.fillText('· 永恒轮回铭牌与大厅搭配工具', padX + 122, 1040);

      ctx.textAlign = 'right';
      ctx.font = `700 15px ${uiFont}`;
      ctx.fillStyle = pal.accent;
      ctx.fillText('er-plate.pages.dev', W - padX, 1040);
      ctx.restore();
    }

    return canvas;
  }

  let shareCardTheme = null;
  let currentShareBlob = null;
  let currentShareUrl = '';
  let shareModalIsRaw = false;

  function syncShareThemeButtons() {
    document.querySelectorAll('[data-share-theme]').forEach((b) => {
      b.classList.toggle('active', b.dataset.shareTheme === shareCardTheme);
    });
  }

  function applyPreviewImageSrc(imgEl, canvas, blob) {
    if (currentShareUrl) {
      URL.revokeObjectURL(currentShareUrl);
      currentShareUrl = '';
    }
    if (isTouchPrimary() || isInAppWebView()) {
      // 手机端与微信/QQ 内置浏览器使用 DataURL，确保长按图片原生菜单可 100% 识别保存或转发
      imgEl.src = canvas.toDataURL('image/png');
    } else {
      currentShareUrl = URL.createObjectURL(blob);
      imgEl.src = currentShareUrl;
    }
  }

  async function refreshShareModalPreview() {
    const loadingEl = el('shareLoading');
    const imgEl = el('sharePreviewImg');
    const copyBtn = el('shareCopyBtn');
    const dlBtn = el('shareDownloadBtn');
    if (loadingEl) { loadingEl.hidden = false; loadingEl.textContent = '正在合成高清搭配清单图…'; }
    if (imgEl) imgEl.hidden = true;
    if (copyBtn) copyBtn.disabled = true;
    if (dlBtn) dlBtn.disabled = true;

    try {
      const canvas = await buildShareCardCanvas(shareCardTheme || state.theme);
      if (!canvas) {
        if (el('shareBackdrop')) el('shareBackdrop').hidden = true;
        return;
      }
      const blob = await canvasToPngBlob(canvas);
      currentShareBlob = blob;
      if (imgEl) {
        applyPreviewImageSrc(imgEl, canvas, blob);
        imgEl.hidden = false;
      }
      if (loadingEl) loadingEl.hidden = true;
      if (copyBtn) copyBtn.disabled = false;
      if (dlBtn) dlBtn.disabled = false;
    } catch (err) {
      if (loadingEl) loadingEl.textContent = '合成失败，请刷新页面后重试';
      handleExportError(err);
    }
  }

  function openShareModal() {
    shareModalIsRaw = false;
    if (!shareCardTheme) shareCardTheme = state.theme;
    syncShareThemeButtons();
    const titleEl = el('shareModalTitle');
    const hintEl = el('shareFootHint');
    const switchEl = document.querySelector('.share-theme-switch');
    if (titleEl) titleEl.textContent = '铭牌搭配分享图预览';
    if (hintEl) hintEl.textContent = '自动附上当前实验体、皮肤、边框、背景与头像官方名称（手机端可直接长按上方图片保存）';
    if (switchEl) switchEl.hidden = false;
    if (el('shareBackdrop')) el('shareBackdrop').hidden = false;
    refreshShareModalPreview();
  }

  function openRawPngModal(canvas, blob) {
    shareModalIsRaw = true;
    currentShareBlob = blob;
    const titleEl = el('shareModalTitle');
    const hintEl = el('shareFootHint');
    const switchEl = document.querySelector('.share-theme-switch');
    const loadingEl = el('shareLoading');
    const imgEl = el('sharePreviewImg');
    const copyBtn = el('shareCopyBtn');
    const dlBtn = el('shareDownloadBtn');
    if (titleEl) titleEl.textContent = '高清透明原图（长按图片保存）';
    if (hintEl) hintEl.textContent = '检测到微信/QQ内置浏览器，请直接长按上方高清透明 PNG 保存到手机相册或发送好友';
    if (switchEl) switchEl.hidden = true;
    if (loadingEl) loadingEl.hidden = true;
    if (imgEl) {
      applyPreviewImageSrc(imgEl, canvas, blob);
      imgEl.hidden = false;
    }
    if (copyBtn) copyBtn.disabled = false;
    if (dlBtn) dlBtn.disabled = false;
    if (el('shareBackdrop')) el('shareBackdrop').hidden = false;
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
  const pickRandom = (arr) => (arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : '');

  document.querySelectorAll('[data-stage-bg]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.stageBg || 'auto';
      if (el('previewArea')) el('previewArea').dataset.stageBg = mode;
      document.querySelectorAll('[data-stage-bg]').forEach((b) => {
        b.classList.toggle('active', b.dataset.stageBg === mode);
      });
    });
  });

  if (el('favDrawerBtn')) {
    el('favDrawerBtn').addEventListener('click', () => {
      favDrawerOpen = !favDrawerOpen;
      renderFavoritesDrawer();
    });
  }

  if (el('randomRoleBtn')) {
    el('randomRoleBtn').addEventListener('click', () => {
      const r = activeRole();
      const skinPool = skinsFor(r.characterKey, r.variant);
      const nextSkin = pickRandom(skinPool) || r.skin;
      r.skin = nextSkin;
      r[r.variant === 'full' ? 'fullSkin' : 'halfSkin'] = nextSkin;
      r.skinLabel = displaySkinTitle(r.characterKey, nextSkin, r.variant);
      r.border = pickRandom(ASSET.borders) || r.border;
      r.background = pickRandom(ASSET.characterBackgrounds) || r.background;
      r.avatar = pickRandom(ASSET.avatars) || r.avatar;
      if (CORE_TRAITS.length) {
        const rndCore = pickRandom(CORE_TRAITS);
        if (rndCore) r.coreTrait = rndCore.key;
      }
      if (state.mode === 'squad') renderSquadHead();
      renderRoleEditor();
      renderPreview();
      showToast(`已为「${characterDisplayName(r.characterKey)}」随机搭配一套新铭牌灵感`);
    });
  }

  if (el('randomTeamBtn')) {
    el('randomTeamBtn').addEventListener('click', () => {
      const slot = state.teamSlots[state.selectedTeamSlot];
      if (!slot) return;
      slot.enabled = true;
      slot.background = pickRandom(ASSET.teamBackgrounds) || slot.background;
      slot.avatar = pickRandom(ASSET.avatars) || slot.avatar;
      renderTeamEditor();
      renderPreview();
      showToast(`已为号位 0${state.selectedTeamSlot + 1} 随机抽取背景与头像`);
    });
  }

  el('resetButton').addEventListener('click', () => {
    if (state.mode === 'role') state.role = makeRoleConfig();
    else if (state.mode === 'squad') state.squad = makeDefaultSquad();
    else state.teamSlots = [makeTeamSlot(true, 0), makeTeamSlot(true, 1), makeTeamSlot(true, 2), makeTeamSlot(false, 3)];
    renderControls();
    renderPreview();
    showToast('已恢复默认校准参数');
  });
  el('exportButton').addEventListener('click', exportPng);
  if (el('copyButton')) el('copyButton').addEventListener('click', copyPng);
  if (el('shareButton')) el('shareButton').addEventListener('click', openShareModal);
  if (el('shareBackdrop')) {
    el('shareClose')?.addEventListener('click', () => { el('shareBackdrop').hidden = true; });
    el('shareBackdrop').addEventListener('click', (e) => {
      if (e.target === el('shareBackdrop')) el('shareBackdrop').hidden = true;
    });
    document.querySelectorAll('[data-share-theme]').forEach((b) => {
      b.addEventListener('click', () => {
        shareCardTheme = b.dataset.shareTheme;
        syncShareThemeButtons();
        refreshShareModalPreview();
      });
    });
    el('shareCopyBtn')?.addEventListener('click', async () => {
      if (!currentShareBlob) return;
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': currentShareBlob })]);
          showToast('已复制图片到剪贴板，可直接粘贴到 QQ / 微信！');
        } else {
          showToast('当前浏览器不支持剪贴板写入图片，请长按上方图片或点击“保存 PNG”');
        }
      } catch (err) {
        showToast('当前浏览器限制剪贴板写入，请长按上方图片或点击“保存 PNG”');
      }
    });
    el('shareDownloadBtn')?.addEventListener('click', () => {
      if (!currentShareBlob) return;
      if (isInAppWebView()) {
        showToast('请直接长按上方预览图片，选择“保存到手机”或“发送给朋友”');
        return;
      }
      const dlUrl = URL.createObjectURL(currentShareBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      const rawName = state.mode === 'role' ? '角色铭牌' : state.mode === 'squad' ? '三人加载连排' : '队伍大厅';
      const shareName = state.mode === 'role'
        ? `${characterDisplayName(state.role.characterKey) || '角色'}搭配单`
        : state.mode === 'squad'
          ? '三人加载连排搭配单'
          : '队伍大厅搭配单';
      const suffix = shareModalIsRaw ? rawName : shareName;
      a.download = `卢米亚铭牌工坊-${suffix}.png`;
      a.href = dlUrl;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => a.remove(), 300);
      setTimeout(() => URL.revokeObjectURL(dlUrl), 60000);
      showToast('高清 PNG 已保存');
    });
  }

  if (el('mobilePreviewToggle') && el('workspaceMain')) {
    el('mobilePreviewToggle').addEventListener('click', () => {
      const ws = el('workspaceMain');
      const expanded = ws.classList.toggle('is-mobile-expanded');
      el('mobilePreviewToggle').textContent = expanded ? '恢复分屏' : '放大预览';
      updateStageScaleOnly();
    });
  }

  if (window.ResizeObserver && el('previewStage')) {
    const ro = new ResizeObserver(() => updateStageScaleOnly());
    ro.observe(el('previewStage'));
  }
  window.addEventListener('resize', () => updateStageScaleOnly());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (el('shareBackdrop') && !el('shareBackdrop').hidden) {
        el('shareBackdrop').hidden = true;
        return;
      }
      if (el('changelogBackdrop') && !el('changelogBackdrop').hidden) {
        el('changelogBackdrop').hidden = true;
        return;
      }
    }
    if (e.target.matches('input, select')) return;
    if (e.key === '1') { state.mode = 'role'; renderControls(); renderPreview(); }
    if (e.key === '2') { state.mode = 'squad'; renderControls(); renderPreview(); }
    if (e.key === '3') { state.mode = 'team'; renderControls(); renderPreview(); }
  });

  // ==================== 更新日志弹窗 & 免手动清缓存自动热刷新机制 ====================
  let cachedChangelog = FALLBACK_CHANGELOG;
  let knownBuildStamp = null;

  function renderChangelogModal(entries) {
    const body = el('changelogBody');
    if (!body) return;
    body.innerHTML = (entries || FALLBACK_CHANGELOG)
      .map(
        (ent) => `<div class="changelog-entry">
          <div class="changelog-meta">
            <span class="changelog-ver">v${esc(ent.version)}</span>
            <span class="changelog-date">${esc(ent.date || '')}</span>
          </div>
          <ul>${(ent.items || []).map((it) => `<li>${esc(it)}</li>`).join('')}</ul>
        </div>`
      )
      .join('');
  }

  async function checkRemoteVersion(isInitial = false) {
    if (location.protocol !== 'http:' && location.protocol !== 'https:') return;
    try {
      const resp = await fetch(`version.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!resp.ok) return;
      const data = await resp.json();
      if (Array.isArray(data.changelog) && data.changelog.length) {
        cachedChangelog = data.changelog;
        renderChangelogModal(cachedChangelog);
      }
      const remoteVer = String(data.version || '').trim();
      const remoteStamp = `${remoteVer}_${data.buildId || data.updatedAt || ''}`;
      if (isInitial && !knownBuildStamp) {
        knownBuildStamp = remoteStamp;
      }
      const versionChanged = remoteVer && remoteVer !== APP_VERSION;
      const buildChanged = knownBuildStamp && remoteStamp !== knownBuildStamp;
      if (versionChanged || buildChanged) {
        const guardKey = 'er_plate_autoreload_stamp';
        if (sessionStorage.getItem(guardKey) === remoteStamp) return;
        sessionStorage.setItem(guardKey, remoteStamp);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
        showToast(`检测到新版本 v${remoteVer}，正在自动刷新至最新版…`);
        setTimeout(() => {
          const u = new URL(location.href);
          u.searchParams.set('_v', remoteStamp);
          location.replace(u.toString());
        }, 550);
      }
    } catch {}
  }

  if (el('versionLabel')) el('versionLabel').textContent = `v${APP_VERSION}`;
  renderChangelogModal(cachedChangelog);

  if (el('changelogButton') && el('changelogBackdrop')) {
    el('changelogButton').addEventListener('click', () => {
      renderChangelogModal(cachedChangelog);
      el('changelogBackdrop').hidden = false;
    });
    el('changelogClose')?.addEventListener('click', () => {
      el('changelogBackdrop').hidden = true;
    });
    el('changelogBackdrop').addEventListener('click', (e) => {
      if (e.target === el('changelogBackdrop')) el('changelogBackdrop').hidden = true;
    });
  }

  checkRemoteVersion(true);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkRemoteVersion(false);
  });
  setInterval(() => checkRemoteVersion(false), 180000);

  document.body.dataset.theme = state.theme;
  syncThemeBtn();
  renderControls();
  renderPreview();
})();
