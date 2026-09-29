/* =========================================================
   oneusop · central app registry + privacy policy content
   Used by root privacy.html and each app's privacy.html
   ========================================================= */
(function () {
  'use strict';

  // slug -> metadata (theme colors, contact email, store url, update date)
  window.ONEUSOP_APPS = {
    'animal-maze': {
      slug: 'animal-maze', name: { zh: '动物迷宫', en: 'Animal Maze' }, theme: 'maze',
      email: 'oneusop@163.com',
      appStoreUrl: 'https://apps.apple.com/cn/app/%E5%8A%A8%E7%89%A9%E8%BF%B7%E5%AE%AB-%E9%94%BB%E7%82%BC%E9%80%BB%E8%BE%91%E6%80%9D%E7%BB%B4%E8%83%BD%E5%8A%9B/id6455493263',
      updated: { zh: '2026 年 1 月 1 日', en: 'January 1, 2026' }
    },
    'cartoon-drawing': {
      slug: 'cartoon-drawing', name: { zh: '卡通绘画', en: 'Cartoon Drawing' }, theme: 'drawing',
      email: 'oneusop@163.com',
      appStoreUrl: 'https://apps.apple.com/cn/app/%E5%8D%A1%E9%80%9A%E7%BB%98%E7%94%BB-%E5%A5%BD%E7%94%A8%E7%9A%84%E5%90%AF%E8%92%99%E7%BB%98%E7%94%BB%E8%BD%AF%E4%BB%B6/id6462798026',
      updated: { zh: '2026 年 1 月 1 日', en: 'January 1, 2026' }
    },
    'fun-puzzle': {
      slug: 'fun-puzzle', name: { zh: '趣味拼图', en: 'Fun Puzzle' }, theme: 'puzzle',
      email: 'oneusop@163.com',
      appStoreUrl: 'https://apps.apple.com/cn/app/%E8%B6%A3%E5%91%B3%E6%8B%BC%E5%9B%BE-%E7%9B%8A%E6%99%BA%E8%B6%A3%E5%91%B3%E6%8B%BC%E5%9B%BE%E6%B8%B8%E6%88%8F/id6458530141',
      updated: { zh: '2026 年 1 月 1 日', en: 'January 1, 2026' }
    },
    'beautiful-clock': {
      slug: 'beautiful-clock', name: { zh: '精美时钟', en: 'Beautiful Clock' }, theme: 'clock',
      email: 'oneusop@163.com',
      appStoreUrl: 'https://apps.apple.com/cn/app/%E7%B2%BE%E7%BE%8E%E6%97%B6%E9%92%9F-%E4%B8%80%E6%AC%BE%E5%A5%BD%E7%9C%8B%E5%8F%88%E4%B8%93%E4%B8%9A%E7%9A%84%E5%85%A8%E5%B1%8F%E6%97%B6%E9%92%9F/id6455303889',
      updated: { zh: '2026 年 1 月 1 日', en: 'January 1, 2026' }
    },
    'little-tomato': {
      slug: 'little-tomato', name: { zh: '小番茄', en: 'Little Tomato' }, theme: 'tomato',
      email: 'oneusop@163.com',
      appStoreUrl: 'https://apps.apple.com/cn/app/%E5%B0%8F%E7%95%AA%E8%8C%84-%E6%9E%81%E7%AE%80%E8%87%AA%E5%BE%BD%E7%95%AA%E8%8C%84%E6%97%B6%E9%92%9F%E5%AD%A6%E4%B9%A0%E5%99%A8/id6452391977',
      updated: { zh: '2026 年 1 月 1 日', en: 'January 1, 2026' }
    },
    'cute-pet': {
      slug: 'cute-pet', name: { zh: '萌宠', en: 'Cute Pet' }, theme: 'pet',
      email: 'oneusop@163.com',
      appStoreUrl: 'https://apps.apple.com/cn/app/%E8%90%8C%E5%AE%A0-%E5%8F%AF%E7%88%B1%E7%9A%84%E5%AE%A0%E7%89%A9app/id6736706296',
      updated: { zh: '2026 年 1 月 1 日', en: 'January 1, 2026' }
    },
    'small-clock': {
      slug: 'small-clock', name: { zh: '小钟', en: 'Small Clock' }, theme: 'smallclock',
      email: 'oneusop@163.com',
      appStoreUrl: 'https://apps.apple.com/us/app/small-clock-beautiful-clock/id6453887726',
      updated: { zh: '2026 年 1 月 1 日', en: 'January 1, 2026' }
    },
    'gadget-set': {
      slug: 'gadget-set', name: { zh: '工具箱', en: 'Gadget Set' }, theme: 'gadget',
      email: 'oneusop@163.com',
      appStoreUrl: 'https://apps.apple.com/us/app/gadget-set-toolbox/id6456040003',
      updated: { zh: '2026 年 1 月 1 日', en: 'January 1, 2026' }
    }
  };

  // common privacy policy content (fully bilingual, app-agnostic body)
  window.ONEUSOP_PRIVACY = {
    zh: {
      title: '隐私政策',
      updatedLabel: '最后更新',
      heroSub: '透明 · 克制 · 可信任',
      intro: '欢迎使用 {app}。我们深知个人信息对您的重要性，并会尽力保护您的隐私与安全。本政策说明我们在您使用本应用时会如何处理相关信息。',
      trust: [
        { icon: '🔒', t: '最小收集' },
        { icon: '📱', t: '本地优先' },
        { icon: '🧒', t: '保护儿童' },
        { icon: '🚫', t: '不出售数据' }
      ],
      sections: [
        { icon: '📋', h: '我们收集的信息', p: '我们尽量精简数据收集。在正常运行过程中，本应用不会强制要求您提供姓名、邮箱等个人身份信息。部分功能（如您主动反馈）所提交的内容，仅用于回应您的需求。' },
        { icon: '📡', h: '自动收集的信息', p: '为改进体验，应用可能会收集设备型号、系统版本、崩溃日志等匿名化技术信息。这些数据不包含可直接识别您个人的内容，且主要用于稳定性与性能优化。' },
        { icon: '🤝', h: '第三方服务', p: '本应用通过 Apple 的 App Store 分发，并可能使用 Apple 提供的标准机制（如 StoreKit、Family Controls 等）。相关数据处理遵循 Apple 的隐私政策。我们不向第三方出售您的任何个人信息。' },
        { icon: '🧒', h: '儿童隐私', p: '部分应用面向儿童设计。我们特别重视未成年用户的保护，不会针对儿童进行广告追踪或收集超出必要范围的个人信息。若您是家长并希望了解或删除相关数据，欢迎随时联系我们。' },
        { icon: '🛡️', h: '数据安全', p: '我们采用合理的物理、电子及管理措施保护信息，防止未经授权的访问、泄露或丢失。本应用内的本地数据默认仅存储于您的设备之上。' },
        { icon: '⚖️', h: '您的权利', p: '您有权了解、更正或删除我们持有的您的个人信息，并可在设备系统中管理相关权限。如您希望行使上述权利，请通过下方联系方式与我们联系。' },
        { icon: '🔄', h: '政策变更', p: '我们可能不时更新本隐私政策。重大变更将通过应用内公告或更新说明予以提示，更新后的政策自发布之日起生效。' }
      ],
      contactLabel: '联系我们',
      contactText: '如您对本隐私政策有任何疑问，或希望行使您的隐私权利，请通过以下邮箱与我们联系：',
      contactHint: '我们通常会在 1–3 个工作日内回复',
      backLabel: '返回应用'
    },
    en: {
      title: 'Privacy Policy',
      updatedLabel: 'Last updated',
      heroSub: 'Transparent · Minimal · Trustworthy',
      intro: 'Welcome to {app}. We understand how important your personal information is and are committed to protecting your privacy and security. This policy explains how we handle information when you use this application.',
      trust: [
        { icon: '🔒', t: 'Minimal collection' },
        { icon: '📱', t: 'On-device first' },
        { icon: '🧒', t: 'Child-safe' },
        { icon: '🚫', t: 'Never sold' }
      ],
      sections: [
        { icon: '📋', h: 'Information We Collect', p: 'We keep data collection to a minimum. The app does not require you to provide personal identifiers such as your name or email to function. Information you submit voluntarily (such as feedback) is used only to respond to your needs.' },
        { icon: '📡', h: 'Automatically Collected Information', p: 'To improve your experience, the app may collect anonymized technical data such as device model, OS version and crash logs. This data cannot directly identify you and is used solely for stability and performance.' },
        { icon: '🤝', h: 'Third-Party Services', p: 'This app is distributed through the Apple App Store and may use Apple-provided standard mechanisms (e.g. StoreKit, Family Controls). Such processing follows Apple’s Privacy Policy. We never sell your personal information to any third party.' },
        { icon: '🧒', h: "Children's Privacy", p: 'Some of our apps are designed for children. We pay special attention to protecting minors and do not target children with ad tracking or collect more personal information than necessary. Parents who wish to review or delete related data may contact us at any time.' },
        { icon: '🛡️', h: 'Data Security', p: 'We use reasonable physical, electronic and managerial safeguards to protect information against unauthorized access, disclosure or loss. Local data within the app is, by default, stored only on your device.' },
        { icon: '⚖️', h: 'Your Rights', p: 'You have the right to access, correct or delete your personal information and to manage related permissions in your device settings. To exercise these rights, please reach out via the contact details below.' },
        { icon: '🔄', h: 'Changes to This Policy', p: 'We may update this privacy policy from time to time. Material changes will be highlighted via in-app notices or release notes, and the updated policy takes effect upon publication.' }
      ],
      contactLabel: 'Contact Us',
      contactText: 'If you have any questions about this privacy policy, or wish to exercise your privacy rights, please contact us at:',
      contactHint: 'We typically reply within 1–3 business days',
      backLabel: 'Back to App'
    }
  };
})();
