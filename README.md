# 🇵🇸 Boykot İsrail - Alternatif Uygulamalar

Bu proje, İsrail menşeli ürün ve hizmetlere alternatifler sunarak bilinçli tüketimi desteklemek amacıyla geliştirilmiştir.

## 🌟 Özellikler

- **3 Sayfalı Modern Web Sitesi**: Ana sayfa, uygulamalar listesi ve öneri gönderme formu
- **Arama ve Filtreleme**: Kategori, kullanım durumu ve arama ile kolay navigasyon
- **Mobil Uyumlu Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Topluluk Katkısı**: Kullanıcıların yeni öneriler gönderebilmesi
- **Modern UI/UX**: Tailwind CSS ile profesyonel tasarım

## 🛠️ Teknolojiler

- **Frontend**: Vite + Vanilla JavaScript
- **Styling**: Tailwind CSS
- **Data**: JSON tabanlı veri yönetimi
- **Deployment**: Dokploy uyumlu

## 🚀 Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlat
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

### 4. Preview
```bash
npm run preview
```

## 📁 Proje Yapısı

```
boycott-israel/
├── index.html              # Ana sayfa
├── apps.html               # Uygulamalar listesi
├── submit.html             # Öneri gönderme formu
├── package.json            # Proje konfigürasyonu
├── vite.config.js          # Vite konfigürasyonu
├── tailwind.config.js      # Tailwind konfigürasyonu
├── postcss.config.js       # PostCSS konfigürasyonu
├── src/
│   ├── main.js            # Ana JavaScript dosyası
│   └── style.css          # Ana CSS dosyası
└── data/
    └── apps.json          # Uygulamalar verisi
```

## 🌐 Sayfalar

1. **Ana Sayfa (index.html)**: Hero section, özellikler ve çağrı-eylem bölümleri
2. **Uygulamalar (apps.html)**: Filtrelenebilir uygulama listesi
3. **Öneri Gönder (submit.html)**: Yeni uygulama önerme formu

## 📊 Veri Yapısı

Uygulamalar `data/apps.json` dosyasında şu formatta saklanır:

```json
{
  "name": "Uygulama Adı",
  "category": "Kategori",
  "usedInTR": true/false,
  "alternative": "Alternatif uygulamalar",
  "reason": "İsrail bağlantısının açıklaması"
}
```

## 🚀 Dokploy ile Deployment

1. Bu repository'yi fork edin veya kopyalayın
2. Dokploy dashboard'unuzda yeni bir proje oluşturun
3. Repository URL'nizi ekleyin
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy edin!

## 🔧 Özelleştirme

### Yeni Uygulama Ekleme
`data/apps.json` dosyasını düzenleyerek yeni uygulamalar ekleyebilirsiniz.

### Stil Değişiklikleri
`tailwind.config.js` ve `src/style.css` dosyalarını düzenleyerek tasarımı özelleştirebilirsiniz.

### Form Entegrasyonu
`src/main.js` dosyasındaki form handler'ı güncelleyerek Formspree, Netlify Forms veya başka bir servis ile entegre edebilirsiniz.

## 🤝 Katkıda Bulunma

1. Repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje açık kaynak kodlu olarak geliştirilmiştir. Özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz.

## 🎯 Amaç

Bu platform, Filistin davasına destek olmak ve bilinçli tüketimi teşvik etmek amacıyla oluşturulmuştur. Amacımız, insanların alternatif ürünler hakkında bilgi sahibi olmasını sağlamaktır.

## 🇵🇸 Özgür Filistin İçin

*"Adaletsizlik karşısında sessiz kalmak, zulmeden tarafı seçmektir."* 