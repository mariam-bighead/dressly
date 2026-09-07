import { DressProduct, Order, User } from '../types';
import asoEbiGownImg from '../assets/images/aso_ebi_gown_1788541011532.jpg';
import owambeLaceImg from '../assets/images/owambe_lace_dress_1788541024669.jpg';
import asoEbiPartyImg from '../assets/images/aso_ebi_party_1788541040020.jpg';
import owambeGoldImg from '../assets/images/owambe_gold_dress_1788541050886.jpg';
import owambePurpleImg from '../assets/images/owambe_purple_lace_1788541065705.jpg';
import asoEbiCobaltBlueImg from '../assets/images/aso_ebi_cobalt_blue.jpg';
import asoEbiLilacCoutureImg from '../assets/images/aso_ebi_lilac_couture.jpg';
import asoEbiRoyalPurpleGeleImg from '../assets/images/aso_ebi_royal_purple_gele.jpg';
import asoEbiLatestLaceImg from '../assets/images/aso_ebi_latest_lace.jpg';
import asoEbiBellaStylesImg from '../assets/images/aso_ebi_bella_styles.jpg';
import asoEbiOwambeGuestImg from '../assets/images/aso_ebi_owambe_guest.jpg';
import ankaraCoutureImg from '../assets/images/ankara_couture_gown_1788605243176.jpg';
import ankaraMermaidImg from '../assets/images/ankara_mermaid_dress_1788605256295.jpg';
import ankaraBallGownImg from '../assets/images/ankara_ball_gown_1788605293662.jpg';
import nigerianBridalImg from '../assets/images/nigerian_bridal_gown_1788605268871.jpg';
import asoOkeWeddingImg from '../assets/images/aso_oke_wedding_1788605280891.jpg';

export const INITIAL_DRESSES: DressProduct[] = [
  // ==========================================
  // 1. ASO EBI & OWAMBE (Authentic Nigerian Couture)
  // ==========================================
  {
    id: 'aso-ebi-1',
    title: 'Arike Emerald & Gold Beaded Lace Aso Ebi Gown',
    category: 'Aso Ebi & Owambe',
    silhouette: 'Mermaid',
    length: 'Floor-Length',
    fabric: 'Luxury French Cord Lace, Embroidered Organza & Coral Beads',
    price: 480000,
    sellerShare: 336000, // 70%
    platformShare: 144000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 68,
    description: 'The quintessential Nigerian Owambe showstopper. Handcrafted in Victoria Island, Lagos with iridescent emerald French cord lace, internal 16-bone waist-cinching corset, and a dramatic floor-skimming ruffled fishtail train with hand-strung crystal glass beadwork. Pairs with an opulent matching emerald Gele.',
    details: [
      'Hand-stitched Swarovski micro-crystals and emerald glass beadwork',
      'Sculpted 16-point internal corset for an hourglass Owambe silhouette',
      'Voluminous cascading organza and French cord lace fishtail train',
      'Includes complementary custom-pleated matching luxury auto-Gele',
      'Lined in breathable pure silk-cotton for Lagos celebrations'
    ],
    careInstructions: 'Specialist couture dry clean only. Store hanging in breathable garment bag.',
    images: [
      asoEbiOwambeGuestImg,
      asoEbiGownImg,
      asoEbiBellaStylesImg,
      owambeGoldImg
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Emerald Royale & Gold', hex: '#064e3b' },
      { name: 'Champagne Gilded', hex: '#d4af37' }
    ],
    stock: 7,
    featured: true,
    createdAt: '2026-08-30',
  },
  {
    id: 'aso-ebi-2',
    title: 'Tiwa Royal Blue & Champagne Owambe Lace Dress',
    category: 'Aso Ebi & Owambe',
    silhouette: 'Mermaid',
    length: 'Floor-Length',
    fabric: 'Swiss Voile & French Chantilly Lace with Crystal Netting',
    price: 520000,
    sellerShare: 364000, // 70%
    platformShare: 156000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 74,
    description: 'Regal royal blue and champagne gold luxury Owambe party dress. Engineered with an off-shoulder illusion neckline, hand-beaded metallic embroidery, and a sculpted trumpet skirt that commands attention on any wedding dance floor.',
    details: [
      'Off-shoulder neckline with non-slip silicone interior support band',
      'Elaborate beadwork along the neckline, waist, and flared trumpet hem',
      'Reinforced horsehair braid along hemline for structured wave movement',
      'Lined with breathable silk-cotton charmeuse for tropical comfort'
    ],
    careInstructions: 'Professional luxury dry clean only. Steam from reverse side.',
    images: [
      asoEbiCobaltBlueImg,
      owambeLaceImg,
      asoEbiBellaStylesImg,
      asoEbiRoyalPurpleGeleImg
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Royal Cobalt Blue', hex: '#1e3a8a' },
      { name: 'Imperial Gold', hex: '#ca8a04' }
    ],
    stock: 5,
    featured: true,
    createdAt: '2026-08-28',
  },
  {
    id: 'aso-ebi-3',
    title: 'Folake Magenta & Plum Cord Lace Owambe Gown',
    category: 'Aso Ebi & Owambe',
    silhouette: 'Corset & Peplum',
    length: 'Floor-Length',
    fabric: 'Heavy Cord Lace & Hand-Embellished Metallic Organza',
    price: 450000,
    sellerShare: 315000, // 70%
    platformShare: 135000, // 30%
    sellerId: 'seller-3',
    sellerName: 'Alara Couture',
    sellerRating: 4.9,
    sellerSalesCount: 52,
    description: 'Sculptural Nigerian fashion tailored for the grandest Saturday celebrations. Features statement architectural ruffled puff sleeves, a structured corset peplum bodice, and deep plum cord lace dripping in faceted amethyst crystals.',
    details: [
      'Architectural pleated rosette shoulder sleeves that hold dramatic form',
      'Corset bodice with hook-and-eye and ribbon lace-up back closure',
      'Extravagant Nigerian Owambe party statement silhouette',
      'Handcrafted by master tailors in Ikoyi, Lagos'
    ],
    careInstructions: 'Spot clean crystals; specialist dry clean only.',
    images: [
      asoEbiLilacCoutureImg,
      asoEbiPartyImg,
      asoEbiRoyalPurpleGeleImg,
      owambePurpleImg
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Plum Magenta Noir', hex: '#701a75' },
      { name: 'Rose Gold Shimmer', hex: '#be185d' }
    ],
    stock: 6,
    featured: true,
    createdAt: '2026-08-25',
  },
  {
    id: 'aso-ebi-4',
    title: 'Eniola Champagne Gold French Lace Aso Ebi Gown',
    category: 'Aso Ebi & Owambe',
    silhouette: 'Column',
    length: 'Floor-Length',
    fabric: 'French Guipure Lace & Duchess Satin Underlay',
    price: 495000,
    sellerShare: 346500, // 70%
    platformShare: 148500, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 61,
    description: 'Luminous champagne gold and peach Aso Ebi gala gown. Designed with sheer illusion mesh, delicately hand-appliquéd floral lace motifs, and a graceful fluted column hem with matching headpiece styling.',
    details: [
      'Hand-placed guipure lace motifs on stretch nude illusion tulle',
      'Glistening pearlescent beads and metallic gold threadwork',
      'Full floor-length drape designed for towering stiletto heels',
      'Concealed back zipper with decorative fabric-covered buttons'
    ],
    careInstructions: 'Dry clean only with approved couture cleaners.',
    images: [
      asoEbiLatestLaceImg,
      owambeGoldImg,
      asoEbiOwambeGuestImg,
      owambeLaceImg
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Champagne Gold', hex: '#eab308' },
      { name: 'Soft Peach Petal', hex: '#fbcfe8' }
    ],
    stock: 4,
    featured: true,
    createdAt: '2026-08-22',
  },
  {
    id: 'aso-ebi-5',
    title: 'Morayo Imperial Purple Coral-Beaded Owambe Gown',
    category: 'Aso Ebi & Owambe',
    silhouette: 'Mermaid',
    length: 'Floor-Length',
    fabric: 'Embroidered Net Lace & Authentic Edo Coral Accents',
    price: 580000,
    sellerShare: 406000, // 70%
    platformShare: 174000, // 30%
    sellerId: 'seller-3',
    sellerName: 'Alara Couture',
    sellerRating: 4.9,
    sellerSalesCount: 47,
    description: 'An awe-inspiring homage to Nigerian royalty and celebration culture. Features rich imperial purple net lace adorned with genuine polished coral bead tassels, an asymmetric dramatic shoulder drape, and a cascading mermaid hem.',
    details: [
      'Genuine Edo red coral bead clusters adorning shoulders and waist',
      'Asymmetric single-shoulder draped organza wing',
      'Multi-tiered crinoline-lined mermaid hem with bounce and volume',
      'Bespoke hand-tailored finish from Victoria Island atelier'
    ],
    careInstructions: 'Spot clean coral beads gently; specialist dry clean only.',
    images: [
      asoEbiRoyalPurpleGeleImg,
      owambePurpleImg,
      asoEbiLilacCoutureImg,
      asoEbiPartyImg
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Imperial Violet Purple', hex: '#581c87' },
      { name: 'Crimson Wine', hex: '#831843' }
    ],
    stock: 5,
    featured: true,
    createdAt: '2026-08-20',
  },
  {
    id: 'aso-ebi-6',
    title: 'Ronke Regal Emerald Gele & Lace Aso Ebi Set',
    category: 'Aso Ebi & Owambe',
    silhouette: 'Mermaid',
    length: 'Floor-Length',
    fabric: 'Heavy Swiss Cord Lace, Metallic Lurex & Pure Silk Lining',
    price: 510000,
    sellerShare: 357000, // 70%
    platformShare: 153000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 59,
    description: 'A dazzling emerald green and gold celebration set. Featuring intricate cutwork cord lace, snatched corset bodice, cascading scalloped mermaid train, and pre-styled sculptural luxury auto-gele headtie.',
    details: [
      'Precision scalloped cutwork cord lace with metallic lurex highlights',
      'Includes pre-pleated auto-Gele ready to wear in seconds',
      'Concealed inner stretch bust support and boned midsection',
      'Tailored specifically for Nigerian weddings, birthdays, and Owambe galas'
    ],
    careInstructions: 'Professional dry clean only. Do not iron directly on lurex.',
    images: [
      asoEbiBellaStylesImg,
      asoEbiOwambeGuestImg,
      asoEbiGownImg,
      owambePurpleImg
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Emerald Velvet Green', hex: '#064e3b' },
      { name: 'Pure Gold Leaf', hex: '#eab308' }
    ],
    stock: 8,
    featured: true,
    createdAt: '2026-08-19',
  },
  // ==========================================
  // 2. ANKARA & WAX PRINTS (Authentic African Dutch Wax Couture & Modern Silhouettes)
  // ==========================================
  {
    id: 'ankara-1',
    title: 'Zainab Dutch Wax Ankara Couture Gown',
    category: 'Ankara & Wax Prints',
    silhouette: 'Mermaid',
    length: 'Floor-Length',
    fabric: 'Authentic 100% Cotton Dutch Wax Ankara, Illusion Mesh & Silk Lining',
    price: 320000,
    sellerShare: 224000, // 70%
    platformShare: 96000, // 30%
    sellerId: 'seller-3',
    sellerName: 'Alara Couture',
    sellerRating: 4.9,
    sellerSalesCount: 84,
    description: 'A masterclass in contemporary African haute couture. Sculpted from premium Dutch Wax Ankara featuring intricate royal blue, mustard gold, and ruby red geometric starbursts. Features architectural puff-shoulder ruffles, a boned 16-point waist-cinching corset, and a dramatic cascading fluted trumpet mermaid hemline with horsehair braid support.',
    details: [
      'Authentic double-sided colorfast Dutch Wax block-print cotton',
      'Architectural puffed rosette shoulders engineered with crinoline backing',
      'Internal 16-point spiral steel boned corset for hourglass definition',
      'Dramatic fluted trumpet hemline with concealed loop bustle',
      'Hand-finished with subtle iridescent crystal seed bead embellishments'
    ],
    careInstructions: 'Specialist dry clean or cold gentle hand wash with mild African black soap. Warm iron inside out.',
    images: [
      ankaraCoutureImg,
      ankaraMermaidImg,
      ankaraBallGownImg,
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Royal Indigo & Amber Gold', hex: '#1e3a8a' },
      { name: 'Ruby Vermilion & Sunshine', hex: '#b91c1c' }
    ],
    stock: 9,
    featured: true,
    createdAt: '2026-08-31',
  },
  {
    id: 'ankara-2',
    title: 'Ngozi Emerald & Tangerine Ankara Mermaid Dress',
    category: 'Ankara & Wax Prints',
    silhouette: 'Corset & Peplum',
    length: 'Floor-Length',
    fabric: 'High-Target Super-Wax Cotton Ankara & Corded French Lace Insets',
    price: 290000,
    sellerShare: 203000, // 70%
    platformShare: 87000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 92,
    description: 'Radiant emerald green, warm mustard yellow, and tangerine African wax print sculpted into a snatched peplum corset silhouette. Accented with sheer black French corded lace along the illusion sweetheart décolletage and a voluminous multi-tiered flared mermaid flounce.',
    details: [
      'Contoured double-peplum waistline that flatters hips gracefully',
      'Sheer sweetheart illusion bodice with lace floral cutouts',
      'Flared trumpet skirt with reinforced structured crinoline hem',
      'Concealed invisible back zipper with hook-and-eye safety closure',
      'Tailored by master artisans in Victoria Island, Lagos'
    ],
    careInstructions: 'Dry clean recommended to preserve vivid wax print saturation.',
    images: [
      ankaraMermaidImg,
      ankaraCoutureImg,
      ankaraBallGownImg,
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Emerald Forest & Tangerine', hex: '#047857' },
      { name: 'Turquoise & Ochre Gold', hex: '#0891b2' }
    ],
    stock: 7,
    featured: true,
    createdAt: '2026-08-29',
  },
  {
    id: 'ankara-3',
    title: 'Kemi Royal Indigo Ankara Ball Gown',
    category: 'Ankara & Wax Prints',
    silhouette: 'A-Line',
    length: 'Floor-Length',
    fabric: 'Wax Block-Printed Cotton & Structured Crinoline Petticoat',
    price: 350000,
    sellerShare: 245000, // 70%
    platformShare: 105000, // 30%
    sellerId: 'seller-1',
    sellerName: 'Atelier Laurent Paris',
    sellerRating: 4.9,
    sellerSalesCount: 65,
    description: 'A showstopping high-fashion Ankara ball gown designed for red carpets and high-society galas. Features a sweeping billowing skirt in deep indigo batik motifs and ochre sunbursts, balanced by an off-shoulder sweetheart corset top.',
    details: [
      'Sweeping 180-degree grand ball gown silhouette with tiered petticoat',
      'Sculpted off-shoulder neckline with non-slip interior silicone grip',
      'Deep functional in-seam side pockets for effortless event grace',
      'Built-in waist belt cincher with interior hook closures'
    ],
    careInstructions: 'Specialist ball gown dry clean only. Store in breathable garment dustbag.',
    images: [
      ankaraBallGownImg,
      ankaraCoutureImg,
      ankaraMermaidImg,
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Midnight Indigo & Ochre', hex: '#172554' },
      { name: 'Amethyst Violet & Gold', hex: '#6b21a8' }
    ],
    stock: 6,
    featured: true,
    createdAt: '2026-08-27',
  },
  {
    id: 'ankara-4',
    title: 'Amina Tiered Ruffle Ankara Maxi Dress',
    category: 'Ankara & Wax Prints',
    silhouette: 'Fit & Flare',
    length: 'Maxi',
    fabric: '100% Premium Cotton Wax Print with Smocked Back Bodice',
    price: 240000,
    sellerShare: 168000, // 70%
    platformShare: 72000, // 30%
    sellerId: 'seller-4',
    sellerName: 'Kano Heritage Looms',
    sellerRating: 4.9,
    sellerSalesCount: 110,
    description: 'Effortlessly chic and eye-catching. Designed with three cascading gathered tiers of kaleidoscope Dutch wax Ankara print, paired with a flattering square neckline and romantic elbow balloon sleeves with ruffle trim.',
    details: [
      'Three cascading gathered flounce tiers with rich visual drape',
      'Smocked elastic back panel ensuring a flexible comfortable fit',
      'Voluminous elbow balloon sleeves with elasticated frill cuffs',
      'Pure lightweight breathable cotton perfect for tropical sunshine'
    ],
    careInstructions: 'Gentle machine wash cold with similar colors; warm iron.',
    images: [
      ankaraCoutureImg,
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80',
      ankaraMermaidImg,
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Terracotta Sunset', hex: '#c2410c' },
      { name: 'Peacock Teal & Gold', hex: '#0f766e' }
    ],
    stock: 12,
    featured: false,
    createdAt: '2026-08-24',
  },
  {
    id: 'ankara-5',
    title: 'Chidinma Asymmetric Ankara & Organza Gala Gown',
    category: 'Ankara & Wax Prints',
    silhouette: 'Column',
    length: 'Floor-Length',
    fabric: 'Wax Print Cotton, Sheer Burnt Orange Organza & Glass Beads',
    price: 310000,
    sellerShare: 217000, // 70%
    platformShare: 93000, // 30%
    sellerId: 'seller-3',
    sellerName: 'Alara Couture',
    sellerRating: 4.9,
    sellerSalesCount: 56,
    description: 'Modern Afro-futuristic elegance. Combines high-contrast swirl Ankara motifs with a single dramatic cascading organza cape sleeve, high thigh-high slit, and hand-strung crystal seed beadwork along the contour seams.',
    details: [
      'Asymmetric one-shoulder design with flowing organza wing cape',
      'High-leg side split with reinforced bar-tack stitching',
      'Hand-beaded amber crystal trim accentuating the natural waistline',
      'Full soft silk lining for completely opaque and smooth wear'
    ],
    careInstructions: 'Dry clean only. Steam organza from reverse side.',
    images: [
      ankaraMermaidImg,
      ankaraBallGownImg,
      ankaraCoutureImg,
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Spiced Saffron & Azure', hex: '#d97706' },
      { name: 'Onyx Black & Gold Spark', hex: '#18181b' }
    ],
    stock: 5,
    featured: false,
    createdAt: '2026-08-21',
  },
  {
    id: 'ankara-6',
    title: 'Simi Ankara Corset Peplum Midi Dress',
    category: 'Ankara & Wax Prints',
    silhouette: 'Corset & Peplum',
    length: 'Midi',
    fabric: '100% Hollandais Wax Cotton with Internal Boned Canvas',
    price: 260000,
    sellerShare: 182000, // 70%
    platformShare: 78000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 78,
    description: 'Sleek, sharp, and commanding. A double-fluted architectural peplum rests above a tailored pencil skirt, finished with a sweetheart square neckline, short cap sleeves, and an exposed golden metal back zipper.',
    details: [
      'Sculptural double peplum flare holding sharp structured pleats',
      'Knee-length pencil skirt with back walking vent for easy movement',
      'Square sweetheart neckline framing statement jewelry effortlessly',
      'Exposed chunky gold zipper that runs smoothly from nape to hem'
    ],
    careInstructions: 'Hand wash cold or dry clean. Press with cotton heat setting.',
    images: [
      ankaraBallGownImg,
      ankaraMermaidImg,
      ankaraCoutureImg,
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Scarlet & Gold Medallion', hex: '#dc2626' },
      { name: 'Cobalt & Chartreuse', hex: '#2563eb' }
    ],
    stock: 8,
    featured: false,
    createdAt: '2026-08-18',
  },

  // ==========================================
  // 3. BRIDAL & TRADITIONAL WEDDING (Opulent Nigerian Wedding Couture, Aso-Oke, Edo Coral & Igbo George)
  // ==========================================
  {
    id: 'bridal-trad-1',
    title: 'Olori Burgundy & Gilded Aso-Oke Traditional Bridal Gown',
    category: 'Bridal & Traditional Wedding',
    silhouette: 'Mermaid',
    length: 'Floor-Length',
    fabric: 'Handwoven Metallic Lurex Aso-Oke, Authentic Coral Beads & Crystal Netting',
    price: 850000,
    sellerShare: 595000, // 70%
    platformShare: 255000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 45,
    description: 'The crown jewel of Yoruba and Nigerian traditional weddings. Handwoven on historic Iseyin looms with metallic rose gold and burgundy threads. Adorned with genuine polished red coral bead clusters, custom internal 18-point bridal corset, matching regal Aso-Oke Gele, and Ipele shoulder sash.',
    details: [
      'Authentic handwoven Aso-Oke with metallic lurex warp and weft',
      'Genuine polished red coral beads hand-strung along collar and waist',
      '18-point steel-boned corset tailored for maximum wedding day posture',
      'Includes complementary matching luxury pre-pleated auto-Gele and Ipele',
      'Dramatic fishtail scalloped train with horsehair hem for graceful walk'
    ],
    careInstructions: 'Museum-grade traditional wedding garment preservation dry clean only.',
    images: [
      nigerianBridalImg,
      asoOkeWeddingImg,
      owambeGoldImg,
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Royal Burgundy & Gilded Rose', hex: '#831843' },
      { name: 'Imperial Champagne & Gold', hex: '#ca8a04' }
    ],
    stock: 4,
    featured: true,
    createdAt: '2026-08-30',
  },
  {
    id: 'bridal-trad-2',
    title: 'Adesuwa Edo Royal Traditional Wedding Gown Set',
    category: 'Bridal & Traditional Wedding',
    silhouette: 'Column',
    length: 'Floor-Length',
    fabric: 'Royal Crimson Italian Velvet, Edo Red Coral Regalia & Gold Cord',
    price: 950000,
    sellerShare: 665000, // 70%
    platformShare: 285000, // 30%
    sellerId: 'seller-3',
    sellerName: 'Alara Couture',
    sellerRating: 4.9,
    sellerSalesCount: 38,
    description: 'Fit for a royal princess of the ancient Benin Kingdom. Tailored from heavy imperial crimson Italian velvet with complete traditional regalia: authentic Coral Okuku beaded crown, multi-strand coral bead cape (Ewu-Ivie), coral wrist cuffs, and matching beaded velvet double-wrappers.',
    details: [
      'Includes authentic handcrafted Coral Okuku bridal crown and beaded pins',
      'Heavy Ewu-Ivie coral beaded shoulder cape draped over crimson velvet',
      'Double wrapper traditional silhouette with gold threadwork embroidery',
      'Coral bead wristlets, ivory-look walking staff, and brass accessories',
      'Handmade by Edo traditional master artisans in Benin City & Lagos'
    ],
    careInstructions: 'Spot clean coral beads gently; specialist couture velvet dry clean only.',
    images: [
      nigerianBridalImg,
      owambePurpleImg,
      asoOkeWeddingImg,
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Benin Royal Crimson', hex: '#991b1b' },
      { name: 'Edo Velvet Gold', hex: '#b45309' }
    ],
    stock: 3,
    featured: true,
    createdAt: '2026-08-28',
  },
  {
    id: 'bridal-trad-3',
    title: 'Amara Teal & Rose Gold Aso-Oke Bridal Reception Dress',
    category: 'Bridal & Traditional Wedding',
    silhouette: 'Mermaid',
    length: 'Floor-Length',
    fabric: 'Bespoke Metallic Thread Aso-Oke, French Chantilly Lace & Crystal Tassels',
    price: 780000,
    sellerShare: 546000, // 70%
    platformShare: 234000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 52,
    description: 'An unforgettable bridal reception masterpiece. Shimmering teal and rose gold metallic Aso-Oke woven panels are merged with French Chantilly lace, cascading crystal glass tassels that sway with every dance step, and a grand sculpted fan Gele.',
    details: [
      'Glistening rose gold metallic weft interwoven with deep oceanic teal',
      'Faceted Swarovski crystal fringe swaying across shoulders and peplum',
      'Removable back bustle train for seamless transition to reception dance floor',
      'Includes coordinating custom-sculpted bridal fan Gele headpiece'
    ],
    careInstructions: 'Professional luxury bridal dry clean only.',
    images: [
      asoOkeWeddingImg,
      nigerianBridalImg,
      asoEbiGownImg,
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Teal Peacock & Rose Gold', hex: '#115e59' },
      { name: 'Emerald Royale & Champagne', hex: '#065f46' }
    ],
    stock: 5,
    featured: true,
    createdAt: '2026-08-26',
  },
  {
    id: 'bridal-trad-4',
    title: 'Adaobi Igbo Traditional George & Coral Bridal Gown',
    category: 'Bridal & Traditional Wedding',
    silhouette: 'Fit & Flare',
    length: 'Floor-Length',
    fabric: 'Heavy Indian Embroidered George Silk, Velvet Trim & Polished Coral',
    price: 720000,
    sellerShare: 504000, // 70%
    platformShare: 216000, // 30%
    sellerId: 'seller-3',
    sellerName: 'Alara Couture',
    sellerRating: 4.9,
    sellerSalesCount: 41,
    description: 'Traditional Igbo Igba Nkwu wine-carrying bridal perfection. Opulent golden embroidered Indian George fabric with an off-shoulder corset blouse, layered double wrapper silhouette, heavy multi-tier coral bead necklace, and custom bridal horsetail staff (Nza).',
    details: [
      'Authentic Intricate gold zardozi bullion thread embroidery on silk George',
      'Scalloped off-shoulder neckline with sheer lace cap sleeve illusion',
      'Includes handcrafted white stallion bridal horse-tail whisk (Nza)',
      'Multiple tiers of natural round coral beads with matching earrings'
    ],
    careInstructions: 'Specialist traditional bridal dry clean. Store flat in acid-free paper.',
    images: [
      asoOkeWeddingImg,
      nigerianBridalImg,
      owambeGoldImg,
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Gold Bullion & Ivory George', hex: '#eab308' },
      { name: 'Wine Velvet & Coral', hex: '#881337' }
    ],
    stock: 4,
    featured: true,
    createdAt: '2026-08-23',
  },
  {
    id: 'bridal-trad-5',
    title: 'Zainab Champagne Gold French Lace & Aso-Oke White Wedding Gown',
    category: 'Bridal & Traditional Wedding',
    silhouette: 'Mermaid',
    length: 'Floor-Length',
    fabric: 'French Guipure Corded Lace, Gilded Aso-Oke Insets & Mikado Silk',
    price: 820000,
    sellerShare: 574000, // 70%
    platformShare: 246000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 49,
    description: 'A breathtaking fusion of traditional Nigerian Aso-Oke weaving and contemporary bridal majesty. Floor-length mermaid gown featuring a 3-meter cathedral train, champagne guipure lace appliqué, and a removable woven Aso-Oke ceremonial cape for both altar and reception.',
    details: [
      '3-meter dramatic cathedral lace train with concealed loop bustle',
      'Removable gilded Aso-Oke shoulder cape for two distinct wedding looks',
      'Deep sweetheart plunge neckline with sheer illusion mesh stability',
      'Pearlescent micro-seed beads hand-embroidered into lace petals'
    ],
    careInstructions: 'Museum-grade bridal dry clean and preservation boxing.',
    images: [
      nigerianBridalImg,
      asoOkeWeddingImg,
      owambeLaceImg,
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Warm Ivory & Gilded Aso-Oke', hex: '#fdfbf7' },
      { name: 'Pure Alabaster & Champagne', hex: '#fef08a' }
    ],
    stock: 5,
    featured: true,
    createdAt: '2026-08-20',
  },
  {
    id: 'bridal-trad-6',
    title: 'Halima Royal Northern Kaftan Bridal Gown',
    category: 'Bridal & Traditional Wedding',
    silhouette: 'Boubou & Kaftan',
    length: 'Floor-Length',
    fabric: 'Heavy Pure Silk Brocade, Zardozi Gold Wire Embroidery & Silk Chiffon Veil',
    price: 680000,
    sellerShare: 476000, // 70%
    platformShare: 204000, // 30%
    sellerId: 'seller-4',
    sellerName: 'Kano Heritage Looms',
    sellerRating: 4.9,
    sellerSalesCount: 62,
    description: 'Regal Northern Nigerian traditional wedding bridal Kaftan. Crafted from pure ivory and gold damask brocade with authentic handmade Zardozi metallic thread embroidery along the neckline, cuffs, and hem, accompanied by a flowing hand-beaded bridal veil.',
    details: [
      'Hand-loomed damask silk brocade with subtle shimmering sheen',
      'Artisan handmade gold Zardozi wire embroidery on neckline and wrists',
      'Voluminous floor-sweeping regal Kaftan drape with side walking slits',
      'Includes sheer ivory silk chiffon veil with gold bullion border trim'
    ],
    careInstructions: 'Specialist dry clean only. Steam press veil on lowest heat.',
    images: [
      asoOkeWeddingImg,
      owambePurpleImg,
      nigerianBridalImg,
      'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fit'],
    colors: [
      { name: 'Ivory Damask & Imperial Gold', hex: '#fffbeb' },
      { name: 'Blush Rose & Silver Brocade', hex: '#fce7f3' }
    ],
    stock: 6,
    featured: true,
    createdAt: '2026-08-17',
  },
  // ==========================================
  // 2. EVENING & GALA (6 Plenty Dresses)
  // ==========================================
  {
    id: 'gala-1',
    title: 'Seraphina Emerald Velvet Mermaid Gown',
    category: 'Evening & Gala',
    silhouette: 'Mermaid',
    length: 'Floor-Length',
    fabric: 'Plissé Italian Silk Velvet & Boned Bodice',
    price: 380000,
    sellerShare: 266000, // 70%
    platformShare: 114000, // 30%
    sellerId: 'seller-1',
    sellerName: 'Atelier Laurent Paris',
    sellerRating: 4.9,
    sellerSalesCount: 42,
    description: 'A showstopping floor-sweeping evening gown crafted from sumptuous Italian silk velvet in deep jewel-toned emerald. Features an architectural internal corset, sweeping fishtail hem, and sculpted sweetheart neckline.',
    details: [
      'Internal 14-point flex boning for sculpted silhouette',
      'Plissé velvet with subtle light-catching luster',
      'Floor-skimming puddle train with concealed loop bustle',
      'Hand-finished blind hem and concealed Japanese YKK back zipper'
    ],
    careInstructions: 'Specialist dry clean only. Store hanging in breathable garment cover.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Emerald Velvet Green', hex: '#064e3b' },
      { name: 'Midnight Noir', hex: '#09090b' },
      { name: 'Royal Ruby', hex: '#881337' }
    ],
    stock: 6,
    featured: true,
    createdAt: '2026-08-15',
  },
  {
    id: 'gala-2',
    title: 'Aurelia Golden Brocade Column Gown',
    category: 'Evening & Gala',
    silhouette: 'Column',
    length: 'Floor-Length',
    fabric: 'Metallic Gold Threaded Jacquard & Duchess Satin',
    price: 420000,
    sellerShare: 294000, // 70%
    platformShare: 126000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 58,
    description: 'Handwoven metallic brocade structured into a regal column silhouette with thigh-high slit and asymmetric draped capelet shoulder. Commissioned for grand gala premieres and state banquets.',
    details: [
      'Lurex-infused floral jacquard with radiant shimmer',
      'Asymmetric shoulder cape with structured organza lining',
      'High side walking vent with silk satin piping',
      'Concealed invisible zip closure at side seam'
    ],
    careInstructions: 'Professional dry clean only. Steam from reverse side.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Gilded Champagne', hex: '#d4af37' },
      { name: 'Obsidian Gold', hex: '#1c1917' }
    ],
    stock: 4,
    featured: true,
    createdAt: '2026-08-18',
  },
  {
    id: 'gala-3',
    title: 'Celeste Midnight Chiffon Cape Dress',
    category: 'Evening & Gala',
    silhouette: 'A-Line',
    length: 'Floor-Length',
    fabric: 'Double-Layer Silk Georgette & Hand-Beaded Bodice',
    price: 360000,
    sellerShare: 252000, // 70%
    platformShare: 108000, // 30%
    sellerId: 'seller-1',
    sellerName: 'Atelier Laurent Paris',
    sellerRating: 4.9,
    sellerSalesCount: 42,
    description: 'Ethereal evening silhouette featuring an airy tiered silk georgette skirt and micro-crystal pavé embroidered bodice that twinkles under evening lights.',
    details: [
      'Over 2,400 hand-sewn micro crystal beads on chest panel',
      'Floating silk cape overlay attached at shoulders',
      'Double-faced silk charmeuse inner lining',
      'Elasticated inner stay for secure bust placement'
    ],
    careInstructions: 'Spot clean crystals; specialist dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Starlight', hex: '#0f172a' },
      { name: 'Deep Sapphire', hex: '#1e3a8a' }
    ],
    stock: 5,
    featured: false,
    createdAt: '2026-08-20',
  },
  {
    id: 'gala-4',
    title: 'Genevieve Sculpted Crepe Red Carpet Gown',
    category: 'Evening & Gala',
    silhouette: 'Fit & Flare',
    length: 'Floor-Length',
    fabric: 'Heavy Stretch Crepe & Silk Habotai Lining',
    price: 310000,
    sellerShare: 217000, // 70%
    platformShare: 93000, // 30%
    sellerId: 'seller-3',
    sellerName: 'Alara Couture',
    sellerRating: 4.9,
    sellerSalesCount: 37,
    description: 'Bold sculptural lines contour the body effortlessly in heavy French stretch crepe. Backless plunge with fine silk covered buttons cascading all the way to the hem.',
    details: [
      'Bonded architectural shoulder pad construction',
      'Dramatic low scoop back with 36 silk covered buttons',
      'Internal hook-and-eye waist cincher band',
      'Weighted hemline that holds structural form in motion'
    ],
    careInstructions: 'Dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Scarlet Carmine', hex: '#991b1b' },
      { name: 'Pure Onyx', hex: '#18181b' }
    ],
    stock: 7,
    featured: true,
    createdAt: '2026-08-22',
  },
  {
    id: 'gala-5',
    title: 'Nyx Iridescent Organza Ball Gown',
    category: 'Evening & Gala',
    silhouette: 'Fit & Flare',
    length: 'Floor-Length',
    fabric: 'Prismatic Silk Organza & Taffeta Underskirt',
    price: 450000,
    sellerShare: 315000, // 70%
    platformShare: 135000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 58,
    description: 'A grand ball gown crafted from multi-chromatic silk organza that shifts color between twilight violet and deep oceanic bronze as the wearer moves.',
    details: [
      'Full pleated skirt measuring over 8 meters of circumference',
      'Hidden deep seam pockets for modern ease',
      'Reinforced corset with double lace-up inner closure',
      'Crushed organza dimensional floral applique at hip'
    ],
    careInstructions: 'Specialist couture dry cleaner only.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Prismatic Twilight', hex: '#3b0764' },
      { name: 'Smoky Amethyst', hex: '#581c87' }
    ],
    stock: 3,
    featured: false,
    createdAt: '2026-08-24',
  },
  {
    id: 'gala-6',
    title: 'Ophelia Draped Satin One-Shoulder Gown',
    category: 'Evening & Gala',
    silhouette: 'Column',
    length: 'Floor-Length',
    fabric: 'Heavy Duchess Silk Satin & French Lace Inset',
    price: 340000,
    sellerShare: 238000, // 70%
    platformShare: 102000, // 30%
    sellerId: 'seller-4',
    sellerName: 'Maison Noire Studio',
    sellerRating: 4.8,
    sellerSalesCount: 29,
    description: 'Asymmetrical Grecian drape with an exposed sheer lace side bodice panel. Hand-pleated silk satin cascades from the left shoulder across the waist line.',
    details: [
      'Hand-tucked diagonal drape on torso',
      'French Chantilly lace side panel with scalloped eyelash trim',
      'High side slit with hand-rolled seams',
      'Hidden side zip with silk ribbon pull'
    ],
    careInstructions: 'Dry clean only. Do not wash with water.',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne Gold', hex: '#e2d4b7' },
      { name: 'Caviar Black', hex: '#111827' }
    ],
    stock: 5,
    featured: true,
    createdAt: '2026-08-26',
  },

  // ==========================================
  // 2. COCKTAIL & PARTY (6 Plenty Dresses)
  // ==========================================
  {
    id: 'cocktail-1',
    title: 'Margot Scalloped Bonded Crepe Mini',
    category: 'Cocktail & Party',
    silhouette: 'Shift',
    length: 'Mini',
    fabric: 'Bonded Stretch Crepe & French Jacquard Trim',
    price: 185000,
    sellerShare: 129500, // 70%
    platformShare: 55500, // 30%
    sellerId: 'seller-4',
    sellerName: 'Maison Noire Studio',
    sellerRating: 4.8,
    sellerSalesCount: 29,
    description: 'A crisp modern architectural mini dress with scalloped laser-cut hemline and squared neck. Perfect for gallery openings, rooftop soirees, and cocktails.',
    details: [
      'Architectural bonded crepe that resists wrinkling',
      'Sculptural scalloped hemline with contrast piped edge',
      'Square neckline with wide supportive straps',
      'Concealed back zip with hook-and-eye security closure'
    ],
    careInstructions: 'Dry clean only. Warm iron under pressing cloth.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Hot Raspberry', hex: '#e11d48' },
      { name: 'True Jet Black', hex: '#000000' },
      { name: 'Electric Tangerine', hex: '#ea580c' }
    ],
    stock: 12,
    featured: true,
    createdAt: '2026-08-16',
  },
  {
    id: 'cocktail-2',
    title: 'Zelda Tiered Ruffle Taffeta Cocktail Dress',
    category: 'Cocktail & Party',
    silhouette: 'Fit & Flare',
    length: 'Mini',
    fabric: 'Crisp Silk Taffeta & Horsehair Braid Hem',
    price: 210000,
    sellerShare: 147000, // 70%
    platformShare: 63000, // 30%
    sellerId: 'seller-3',
    sellerName: 'Alara Couture',
    sellerRating: 4.9,
    sellerSalesCount: 37,
    description: 'Voluminous tiered ruffles held buoyant by internal horsehair braid. High-energy party silhouette with sweetheart bustier and detachable organza puff sleeves.',
    details: [
      'Detachable ruched puff sleeves with elastic cuffs',
      'Structured bustier with molded underwire cups',
      'Triple-tiered flounce skirt for buoyant dancing volume',
      'Fully lined in breathable silk habotai'
    ],
    careInstructions: 'Dry clean only. Do not tumble dry.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Bubblegum Punch', hex: '#f43f5e' },
      { name: 'Lilac Frost', hex: '#c084fc' }
    ],
    stock: 8,
    featured: false,
    createdAt: '2026-08-19',
  },
  {
    id: 'cocktail-3',
    title: 'Belladonna Asymmetric Cut-Out Midi',
    category: 'Cocktail & Party',
    silhouette: 'Column',
    length: 'Midi',
    fabric: 'Matte Jersey & Spandex Stretch Knit',
    price: 165000,
    sellerShare: 115500, // 70%
    platformShare: 49500, // 30%
    sellerId: 'seller-4',
    sellerName: 'Maison Noire Studio',
    sellerRating: 4.8,
    sellerSalesCount: 29,
    description: 'Sleek body-skimming cocktail midi with subtle diagonal rib cutout and ruched hip. Moves like second skin while holding high structure.',
    details: [
      'Diagonal rib cage keyhole cutout with internal grip tape',
      'Ruched lateral seam that flatters hip contours',
      'Double-layer stretch jersey for zero sheerness',
      'Side slit for fluid walking stride'
    ],
    careInstructions: 'Hand wash cold or gentle dry clean.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cherry Noir', hex: '#4c0519' },
      { name: 'Pistachio Sage', hex: '#4d7c0f' },
      { name: 'Onyx Black', hex: '#18181b' }
    ],
    stock: 14,
    featured: true,
    createdAt: '2026-08-21',
  },
  {
    id: 'cocktail-4',
    title: 'Saskia Sequin Embellished Wrap Dress',
    category: 'Cocktail & Party',
    silhouette: 'Wrap Dress',
    length: 'Midi',
    fabric: 'Micro-Sequin Mesh & Velvet Sash Tie',
    price: 225000,
    sellerShare: 157500, // 70%
    platformShare: 67500, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 58,
    description: 'High-octane wrap dress drenched in thousands of reflective micro-sequins with contrasting plush velvet tie sash and subtle bell sleeves.',
    details: [
      'All-over micro metallic sequins sewn flat for comfort',
      'Self-tie plush silk velvet belt at natural waist',
      'Soft stretch lining prevents any sequin scratch against skin',
      'Flattering crossover V-neckline with modest press stud'
    ],
    careInstructions: 'Spot clean only. Do not iron directly on sequins.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Liquid Bronze', hex: '#b45309' },
      { name: 'Silver Platinum', hex: '#94a3b8' }
    ],
    stock: 7,
    featured: false,
    createdAt: '2026-08-23',
  },
  {
    id: 'cocktail-5',
    title: 'Camille Feather-Trim Satin Cocktail Dress',
    category: 'Cocktail & Party',
    silhouette: 'Shift',
    length: 'Mini',
    fabric: 'Heavy Duchess Satin & Detachable Ostrich Feather Trim',
    price: 240000,
    sellerShare: 168000, // 70%
    platformShare: 72000, // 30%
    sellerId: 'seller-1',
    sellerName: 'Atelier Laurent Paris',
    sellerRating: 4.9,
    sellerSalesCount: 42,
    description: 'A Parisian classic with playful 1960s couture energy. Crafted from rich duchess satin with a plush detachable feather trim at the hemline for easy cleaning.',
    details: [
      'Ethically sourced detachable feather trim on concealed snap tape',
      'High jewel neckline with deep keyhole back',
      'Bespoke silk covered button nape closure',
      'Boxy modern shift cut that flatters every height'
    ],
    careInstructions: 'Remove feathers before dry cleaning dress.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'Ivory Frost', hex: '#f8fafc' },
      { name: 'Blush Peony', hex: '#fbcfe8' }
    ],
    stock: 6,
    featured: true,
    createdAt: '2026-08-25',
  },
  {
    id: 'cocktail-6',
    title: 'Cleo Pleated Metallic Halter Dress',
    category: 'Cocktail & Party',
    silhouette: 'A-Line',
    length: 'Midi',
    fabric: 'Sunray Pleated Lurex & Chiffon Inset',
    price: 195000,
    sellerShare: 136500, // 70%
    platformShare: 58500, // 30%
    sellerId: 'seller-3',
    sellerName: 'Alara Couture',
    sellerRating: 4.9,
    sellerSalesCount: 37,
    description: 'Liquid gold sunray pleats catch the light with every step. High halter collar ties in a fluid bow that drapes gracefully down the bare spine.',
    details: [
      'Permanent sunray accordion pleating that retains shape',
      'Self-tie halter neck with fluid 40cm back ties',
      'Elasticated waistline with removable matching fabric belt',
      'Flirty handkerchief hemline with rolled serger finish'
    ],
    careInstructions: 'Hand wash cold or gentle dry clean. Do not iron pleats.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Burnished Gold', hex: '#d97706' },
      { name: 'Rose Copper', hex: '#be123c' }
    ],
    stock: 9,
    featured: false,
    createdAt: '2026-08-27',
  },

  // ==========================================
  // 3. BRIDAL & WEDDING GUEST (6 Plenty Dresses)
  // ==========================================
  {
    id: 'bridal-1',
    title: 'Elowen French Alençon Lace Wedding Dress',
    category: 'Bridal & Wedding Guest',
    silhouette: 'A-Line',
    length: 'Floor-Length',
    fabric: 'French Alençon Corded Lace & Silk Organza',
    price: 480000,
    sellerShare: 336000, // 70%
    platformShare: 144000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 58,
    description: 'An heirloom bridal gown featuring authentic French Alençon floral lace layered over delicate ivory silk organza, culminating in an intricate cathedral train.',
    details: [
      'Cathedral-length lace train with French bustle hooks',
      'Illusion neckline with hand-appliquéd corded lace blooms',
      'Scalloped cap sleeves and keyhole illusion back',
      'Silk satin wrapped bridal button back closure with zipper guard'
    ],
    careInstructions: 'Museum-grade bridal preservation dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Ivory', hex: '#fdfbf7' },
      { name: 'Alabaster Silk', hex: '#f8fafc' }
    ],
    stock: 3,
    featured: true,
    createdAt: '2026-08-10',
  },
  {
    id: 'bridal-2',
    title: 'Dahlia Botanical Embroidered Wedding Guest Midi',
    category: 'Bridal & Wedding Guest',
    silhouette: 'Fit & Flare',
    length: 'Midi',
    fabric: 'Silk Organza with Pastel Botanical Threadwork',
    price: 240000,
    sellerShare: 168000, // 70%
    platformShare: 72000, // 30%
    sellerId: 'seller-5',
    sellerName: 'Soleil Silk & Linen',
    sellerRating: 4.8,
    sellerSalesCount: 31,
    description: 'The ultimate garden wedding guest dress. Dainty English wildflowers embroidered across semi-sheer silk organza over a nude slip lining.',
    details: [
      'Delicate multi-color floral threadwork with raised textures',
      'Molded sweetheart bust cups with boned support',
      'Pleated tea-length skirt with crinoline hem band',
      'Slender adjustable silk cord shoulder ties'
    ],
    careInstructions: 'Dry clean only with steam finish.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Blush Floral', hex: '#fed7aa' },
      { name: 'Mint Meadow', hex: '#d1fae5' },
      { name: 'Sky Hydrangea', hex: '#e0f2fe' }
    ],
    stock: 8,
    featured: false,
    createdAt: '2026-08-17',
  },
  {
    id: 'bridal-3',
    title: 'Serena Draped Pearl Slip Wedding Gown',
    category: 'Bridal & Wedding Guest',
    silhouette: 'Slip Dress',
    length: 'Floor-Length',
    fabric: 'Heavy 30-Momme Silk Crepe Back Satin & Freshwater Pearls',
    price: 390000,
    sellerShare: 273000, // 70%
    platformShare: 117000, // 30%
    sellerId: 'seller-1',
    sellerName: 'Atelier Laurent Paris',
    sellerRating: 4.9,
    sellerSalesCount: 42,
    description: 'Minimalist 90s Carolyn Bessette-inspired bridal gown cut on the bias with genuine freshwater pearl back drape detailing.',
    details: [
      'True bias cut that glides effortlessly over curves',
      'Detachable strand of 48 freshwater seed pearls at back shoulder drape',
      'Low cowl back with discreet weight inside for perfect drape',
      'Subtle 30cm train that pools gracefully'
    ],
    careInstructions: 'Specialist bridal dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pearl Silk Ivory', hex: '#fffbeb' },
      { name: 'Oyster White', hex: '#f1f5f9' }
    ],
    stock: 4,
    featured: true,
    createdAt: '2026-08-20',
  },
  {
    id: 'bridal-4',
    title: 'Isabella Corseted Tulle Ball Gown',
    category: 'Bridal & Wedding Guest',
    silhouette: 'Fit & Flare',
    length: 'Floor-Length',
    fabric: 'Layered French Illusion Tulle & Mikado Satin',
    price: 460000,
    sellerShare: 322000, // 70%
    platformShare: 138000, // 30%
    sellerId: 'seller-2',
    sellerName: 'Deola Atelier Lagos',
    sellerRating: 5.0,
    sellerSalesCount: 58,
    description: 'Fairytale bridal ball gown with exposed corset boning, off-the-shoulder draped tulle sleeves, and 12 layers of gossamer tulle.',
    details: [
      'Transparent exposed boning with satin channeled casing',
      'Detachable sweetheart off-shoulder pleated tulle straps',
      'Crinoline cage foundation for grand ballroom volume without heavy weight',
      'Invisible center back zip with inner lacing'
    ],
    careInstructions: 'Professional bridal dry clean.',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Diamond White', hex: '#ffffff' },
      { name: 'Champagne Tulle', hex: '#fef3c7' }
    ],
    stock: 3,
    featured: false,
    createdAt: '2026-08-22',
  },
  {
    id: 'bridal-5',
    title: 'Mariposa Tiered Georgette Wedding Guest Dress',
    category: 'Bridal & Wedding Guest',
    silhouette: 'A-Line',
    length: 'Maxi',
    fabric: 'Printed Silk Georgette & Lurex Fleck',
    price: 215000,
    sellerShare: 150500, // 70%
    platformShare: 64500, // 30%
    sellerId: 'seller-3',
    sellerName: 'Alara Couture',
    sellerRating: 4.9,
    sellerSalesCount: 37,
    description: 'Sophisticated destination wedding attire. Floating silk georgette adorned with watercolor lavender blooms and gold lurex pin-stripes.',
    details: [
      'Flowing cascade tiers that flutter gently in breezes',
      'Smocked back bodice panel providing comfortable all-day fit',
      'Subtle metallic lurex vertical threads that gleam in sunset light',
      'Full length inner silk slip lining'
    ],
    careInstructions: 'Dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Lavender Watercolor', hex: '#e9d5ff' },
      { name: 'Blush Petal', hex: '#fce7f3' }
    ],
    stock: 9,
    featured: true,
    createdAt: '2026-08-25',
  },
  {
    id: 'bridal-6',
    title: 'Adelaide Pleated Halter Wedding Guest Column',
    category: 'Bridal & Wedding Guest',
    silhouette: 'Column',
    length: 'Floor-Length',
    fabric: 'Heavy Crepe de Chine & Organza Sash',
    price: 260000,
    sellerShare: 182000, // 70%
    platformShare: 78000, // 30%
    sellerId: 'seller-5',
    sellerName: 'Soleil Silk & Linen',
    sellerRating: 4.8,
    sellerSalesCount: 31,
    description: 'Chic black-tie wedding guest column gown in rich terracotta rose. High neck ties into an extended dramatic train sash.',
    details: [
      'High gathered halter neck with open back',
      '60cm floor-skimming back neck tie ribbons',
      'Center back walking slit with hand-stitched reinforcement tack',
      'Seamless waistline with internal stay tape'
    ],
    careInstructions: 'Dry clean only. Cool iron on reverse.',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Terracotta Rose', hex: '#b45309' },
      { name: 'Forest Jade', hex: '#065f46' }
    ],
    stock: 6,
    featured: false,
    createdAt: '2026-08-28',
  },

  // ==========================================
  // 4. SILK & SLIP (6 Plenty Dresses)
  // ==========================================
  {
    id: 'silk-1',
    title: 'Aria Draped Mulberry Silk Bias Slip',
    category: 'Silk & Slip',
    silhouette: 'Slip Dress',
    length: 'Midi',
    fabric: '100% 22-Momme Mulberry Silk Charmeuse',
    price: 195000,
    sellerShare: 136500, // 70%
    platformShare: 58500, // 30%
    sellerId: 'seller-6',
    sellerName: 'Zahra Silk House',
    sellerRating: 4.9,
    sellerSalesCount: 64,
    description: 'A luxurious bias-cut slip dress crafted from grade 6A mulberry silk. Drapes like liquid amber with gentle cowl neck and low crossover back straps.',
    details: [
      'True 45-degree diagonal bias cut for fluid drape',
      'Delicate spaghetti straps with 18k gold-plated micro adjusters',
      'Subtle double-faced bust lining for sheer prevention',
      'French seams throughout for unblemished interior'
    ],
    careInstructions: 'Hand wash cold with silk detergent or dry clean.',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Liquid Amber', hex: '#d97706' },
      { name: 'Champagne Satin', hex: '#fef3c7' },
      { name: 'Onyx Noir', hex: '#18181b' }
    ],
    stock: 15,
    featured: true,
    createdAt: '2026-08-11',
  },
  {
    id: 'silk-2',
    title: 'Vivienne Low-Back Cowl Silk Slip',
    category: 'Silk & Slip',
    silhouette: 'Slip Dress',
    length: 'Maxi',
    fabric: 'Sandwashed Silk Crepe de Chine',
    price: 215000,
    sellerShare: 150500, // 70%
    platformShare: 64500, // 30%
    sellerId: 'seller-6',
    sellerName: 'Zahra Silk House',
    sellerRating: 4.9,
    sellerSalesCount: 64,
    description: 'Matte velvet-soft sandwashed silk with a theatrical low cowl back and puddle hem. The quintessential effortless evening silhouette.',
    details: [
      'Sandwashed texture gives matte peach-skin handfeel',
      'Deep back cowl with stabilizing inner weight',
      'Adjustable halter neck ties',
      'High side slit that flashes leg upon movement'
    ],
    careInstructions: 'Dry clean recommended or gentle cold hand wash.',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Dusty Rose', hex: '#f43f5e' },
      { name: 'Sage Celadon', hex: '#84cc16' },
      { name: 'Espresso Satin', hex: '#451a03' }
    ],
    stock: 10,
    featured: true,
    createdAt: '2026-08-14',
  },
  {
    id: 'silk-3',
    title: 'Lila Lace-Trimmed Silk Chemise Dress',
    category: 'Silk & Slip',
    silhouette: 'Shift',
    length: 'Mini',
    fabric: '19-Momme Stretch Silk Satin & French Chantilly Lace',
    price: 155000,
    sellerShare: 108500, // 70%
    platformShare: 46500, // 30%
    sellerId: 'seller-4',
    sellerName: 'Maison Noire Studio',
    sellerRating: 4.8,
    sellerSalesCount: 29,
    description: 'Indulgent silk mini accented with delicate French eyelash lace around the neckline and thigh split. Layer under blazers or wear solo after dark.',
    details: [
      'Fine French Chantilly eyelash lace border',
      '2% elastane woven into silk for gentle contouring stretch',
      'Adjustable racerback thin silk straps',
      'Small side walking split with lace rosette'
    ],
    careInstructions: 'Hand wash with delicate silk wash in lukewarm water.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Lace Noir', hex: '#0f172a' },
      { name: 'Bordeaux Burgundy', hex: '#881337' }
    ],
    stock: 12,
    featured: false,
    createdAt: '2026-08-18',
  },
  {
    id: 'silk-4',
    title: 'Sienna Ombré Dyed Silk Slip Maxi',
    category: 'Silk & Slip',
    silhouette: 'Slip Dress',
    length: 'Maxi',
    fabric: 'Hand-Dyed 22-Momme Silk Charmeuse',
    price: 230000,
    sellerShare: 161000, // 70%
    platformShare: 69000, // 30%
    sellerId: 'seller-6',
    sellerName: 'Zahra Silk House',
    sellerRating: 4.9,
    sellerSalesCount: 64,
    description: 'Each piece is hand-dip-dyed in small batches by artisans, graduating from warm apricot at the neckline to rich sunset terracotta at the hem.',
    details: [
      'Artisanal hand dip-dye process makes every piece unique',
      'Bias cut for natural stretch and silhouette skimming',
      'Deep V-neckline front and back',
      'Self-fabric delicate rolled rouleau straps'
    ],
    careInstructions: 'Dry clean only to maintain artisanal dye gradient.',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Sunset Ombré', hex: '#ea580c' },
      { name: 'Oceanic Blue Ombré', hex: '#0284c7' }
    ],
    stock: 5,
    featured: true,
    createdAt: '2026-08-21',
  },
  {
    id: 'silk-5',
    title: 'Nadia Draped Silk Halter Neck Slip',
    category: 'Silk & Slip',
    silhouette: 'Column',
    length: 'Midi',
    fabric: 'Heavy Silk Jacquard with Micro Chevron Weave',
    price: 205000,
    sellerShare: 143500, // 70%
    platformShare: 61500, // 30%
    sellerId: 'seller-5',
    sellerName: 'Soleil Silk & Linen',
    sellerRating: 4.8,
    sellerSalesCount: 31,
    description: 'Rich chevron-woven silk jacquard that catches the sun. Elegant high halter silhouette that reveals sculpted shoulders and back.',
    details: [
      'Jacquard chevron weave with tonal matte and sheen contrast',
      'Extended back halter sash that drapes to mid-calf',
      'Keyhole front bust opening with delicate pearl button',
      'Finished with baby-locked hem'
    ],
    careInstructions: 'Dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivory Jacquard', hex: '#fdfbf7' },
      { name: 'Golden Olive', hex: '#65a30d' }
    ],
    stock: 8,
    featured: false,
    createdAt: '2026-08-24',
  },
  {
    id: 'silk-6',
    title: 'Solange Crinkled Silk Chiffon Slip',
    category: 'Silk & Slip',
    silhouette: 'A-Line',
    length: 'Midi',
    fabric: 'Permanent Crinkle Silk Chiffon with Satin Slip Underlay',
    price: 180000,
    sellerShare: 126000, // 70%
    platformShare: 54000, // 30%
    sellerId: 'seller-6',
    sellerName: 'Zahra Silk House',
    sellerRating: 4.9,
    sellerSalesCount: 64,
    description: 'Featherlight crinkled silk that packs effortlessly and never needs ironing. Floats around the legs like a dream in warm weather.',
    details: [
      'Two-piece dress: includes detached 100% silk satin slip underlay',
      'Raw edge flutter hemline with fine serging',
      'Flattering bias cut skirt flounce',
      'Ideal for effortless resort and yacht evenings'
    ],
    careInstructions: 'Twist loosely and hand wash cold; dry flat.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Coral Sunrise', hex: '#fb7185' },
      { name: 'Vanilla Cream', hex: '#fef3c7' }
    ],
    stock: 11,
    featured: false,
    createdAt: '2026-08-27',
  },

  // ==========================================
  // 5. SUMMER & LINEN (6 Plenty Dresses)
  // ==========================================
  {
    id: 'linen-1',
    title: 'Capri Tiered Broderie Anglaise Linen Dress',
    category: 'Summer & Linen',
    silhouette: 'A-Line',
    length: 'Midi',
    fabric: '100% Normandy French Washed Linen & Eyelet Embroidery',
    price: 135000,
    sellerShare: 94500, // 70%
    platformShare: 40500, // 30%
    sellerId: 'seller-5',
    sellerName: 'Soleil Silk & Linen',
    sellerRating: 4.8,
    sellerSalesCount: 31,
    description: 'Breezy Mediterranean summer dress cut from premium French flax linen with artisanal eyelet embroidery and a tiered flounce skirt.',
    details: [
      'Pre-washed Normandy flax with ultra-soft broken-in feel',
      'Bespoke eyelet embroidery along tier borders',
      'Smocked elastic back bodice panel ensures flattering fit',
      'Deep functional side pockets lined in lightweight cotton voile'
    ],
    careInstructions: 'Machine wash cold on gentle cycle. Line dry in shade.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Crisp Terracotta', hex: '#c2410c' },
      { name: 'Pure White Linen', hex: '#ffffff' },
      { name: 'Olive Grove', hex: '#3f6212' }
    ],
    stock: 18,
    featured: true,
    createdAt: '2026-08-12',
  },
  {
    id: 'linen-2',
    title: 'Positano Backless Linen Sundress',
    category: 'Summer & Linen',
    silhouette: 'Fit & Flare',
    length: 'Midi',
    fabric: 'Pure Italian Flax Linen & Natural Shell Buttons',
    price: 145000,
    sellerShare: 101500, // 70%
    platformShare: 43500, // 30%
    sellerId: 'seller-5',
    sellerName: 'Soleil Silk & Linen',
    sellerRating: 4.8,
    sellerSalesCount: 31,
    description: 'Chic seaside sundress with apron front, crisscross tie back, and carved mother-of-pearl buttons running down the center skirt.',
    details: [
      'Crisscross back tie allows fully customizable torso fit',
      'Genuine carved mother-of-pearl natural shell buttons',
      'A-line midi skirt with generous sweep for ocean breezes',
      'Reinforced waist seam with gentle gather'
    ],
    careInstructions: 'Machine wash cold; hang dry. Natural wrinkles celebrate linen.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Limoncello Yellow', hex: '#fde047' },
      { name: 'Aegean Cobalt', hex: '#1d4ed8' },
      { name: 'Sand Dunes', hex: '#e7e5e4' }
    ],
    stock: 14,
    featured: true,
    createdAt: '2026-08-15',
  },
  {
    id: 'linen-3',
    title: 'Santorini Halter Linen Shirtdress',
    category: 'Summer & Linen',
    silhouette: 'A-Line',
    length: 'Maxi',
    fabric: 'Heavyweight Irish Flax Linen & Bamboo Belt',
    price: 160000,
    sellerShare: 112000, // 70%
    platformShare: 48000, // 30%
    sellerId: 'seller-7',
    sellerName: 'Ejiro Bespoke',
    sellerRating: 4.9,
    sellerSalesCount: 45,
    description: 'Clean architectural lines in heavyweight breathable Irish linen. Features a convertible lapel collar, side splits, and removable natural bamboo buckle belt.',
    details: [
      'Natural bamboo O-ring buckle belt included',
      'Concealed placket with horn button closures',
      'High side walking splits that reach knee height',
      'Double-stitched chest patch pockets'
    ],
    careInstructions: 'Machine wash cool, tumble dry low or hang dry.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Natural Oatmeal', hex: '#d6d3d1' },
      { name: 'Deep Indigo', hex: '#1e1b4b' }
    ],
    stock: 9,
    featured: false,
    createdAt: '2026-08-19',
  },
  {
    id: 'linen-4',
    title: 'Amalfi Puff-Sleeve Linen Mini',
    category: 'Summer & Linen',
    silhouette: 'Shift',
    length: 'Mini',
    fabric: 'Garment-Dyed French Linen & Cotton Voile Lining',
    price: 125000,
    sellerShare: 87500, // 70%
    platformShare: 37500, // 30%
    sellerId: 'seller-5',
    sellerName: 'Soleil Silk & Linen',
    sellerRating: 4.8,
    sellerSalesCount: 31,
    description: 'Charming warm-weather mini featuring statement gathered puff sleeves, a gentle square neck, and a relaxed shift cut that stays cool in tropical climates.',
    details: [
      'Voluminous puff sleeves with gentle elasticized cuffs',
      'Square neck with interior silicone tape for secure hold',
      'Side inseam pockets',
      '100% organic cotton voile inner lining for zero transparency'
    ],
    careInstructions: 'Machine wash cold; warm iron or steam.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sunset Coral', hex: '#f43f5e' },
      { name: 'Alabaster White', hex: '#fafaf9' }
    ],
    stock: 16,
    featured: false,
    createdAt: '2026-08-22',
  },
  {
    id: 'linen-5',
    title: 'Marrakech Striped Linen Kaftan Dress',
    category: 'Summer & Linen',
    silhouette: 'Shift',
    length: 'Maxi',
    fabric: 'Yarn-Dyed Striped Flax Linen & Hand-Knotted Tassels',
    price: 150000,
    sellerShare: 105000, // 70%
    platformShare: 45000, // 30%
    sellerId: 'seller-7',
    sellerName: 'Ejiro Bespoke',
    sellerRating: 4.9,
    sellerSalesCount: 45,
    description: 'Generously cut resort kaftan dress featuring hand-loomed vertical sunset stripes and silk thread tassels at the split mandarin collar.',
    details: [
      'Yarn-dyed woven stripes will never fade or peel',
      'Deep notched V-neckline with hand-braided silk tassel cords',
      'Side slits for effortless poolside movement',
      'Oversized silhouette drapes effortlessly on all body types'
    ],
    careInstructions: 'Hand wash cold or gentle machine wash.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Saffron & Spice Stripe', hex: '#d97706' },
      { name: 'Azure Sea Stripe', hex: '#0284c7' }
    ],
    stock: 12,
    featured: true,
    createdAt: '2026-08-25',
  },
  {
    id: 'linen-6',
    title: 'Cassis Cut-Out Linen Halter Maxi',
    category: 'Summer & Linen',
    silhouette: 'A-Line',
    length: 'Maxi',
    fabric: 'Medium Weight Belgian Linen',
    price: 170000,
    sellerShare: 119000, // 70%
    platformShare: 51000, // 30%
    sellerId: 'seller-5',
    sellerName: 'Soleil Silk & Linen',
    sellerRating: 4.8,
    sellerSalesCount: 31,
    description: 'Sculptural front keyhole cutout with high halter tie and an expansive tiered maxi skirt that sways with breezy ease.',
    details: [
      'Front circular keyhole with adjustable ruching tie',
      'Elasticized back waistband for custom contouring',
      'Dual deep side pockets',
      'Pre-shrunk Belgian linen ensures lasting shape after wash'
    ],
    careInstructions: 'Machine wash cold; hang to air dry.',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Earthy Olive', hex: '#3f6212' },
      { name: 'Raw Natural Flax', hex: '#e7e5e4' }
    ],
    stock: 8,
    featured: false,
    createdAt: '2026-08-28',
  },

  // ==========================================
  // 6. DAYWEAR & CASUAL (6 Plenty Dresses)
  // ==========================================
  {
    id: 'day-1',
    title: 'Astrid Tailored Poplin Shirt Dress',
    category: 'Daywear & Casual',
    silhouette: 'A-Line',
    length: 'Midi',
    fabric: '100% Crisp Organic Cotton Poplin',
    price: 110000,
    sellerShare: 77000, // 70%
    platformShare: 33000, // 30%
    sellerId: 'seller-7',
    sellerName: 'Ejiro Bespoke',
    sellerRating: 4.9,
    sellerSalesCount: 45,
    description: 'An immaculate everyday shirt dress tailored in structured organic cotton poplin. Features sharp pointed collar, concealed button placket, and deep curved hemline.',
    details: [
      'Pre-washed organic poplin that stays crisp and wrinkle-resistant',
      'Detachable sash belt to cinch waist or wear loose as a shift',
      'Twin hidden chest pockets and generous hip pockets',
      'Fold-over cuff sleeves with button tab security'
    ],
    careInstructions: 'Machine wash warm, tumble dry low, steam or iron as desired.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oxford Sky Blue', hex: '#93c5fd' },
      { name: 'Pristine White', hex: '#ffffff' },
      { name: 'Navy Midnight', hex: '#172554' }
    ],
    stock: 20,
    featured: true,
    createdAt: '2026-08-13',
  },
  {
    id: 'day-2',
    title: 'Chloe Ribbed Knit Polo Dress',
    category: 'Daywear & Casual',
    silhouette: 'Column',
    length: 'Midi',
    fabric: 'Fine Gauge Mercerized Cotton & Viscose Blend',
    price: 95000,
    sellerShare: 66500, // 70%
    platformShare: 28500, // 30%
    sellerId: 'seller-7',
    sellerName: 'Ejiro Bespoke',
    sellerRating: 4.9,
    sellerSalesCount: 45,
    description: 'Effortless knit day dress featuring sporty polo collar, horn button placket, and fine ribbed stitch that contours without clinging.',
    details: [
      'Mercerized Egyptian cotton thread provides subtle luster and softness',
      'Horn button placket with ribbed knit collar',
      'Side leg split for comfortable stride',
      'Retains elastic memory without stretching out over day'
    ],
    careInstructions: 'Hand wash cold or gentle cycle. Dry flat to maintain shape.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Heather Oatmeal', hex: '#d6d3d1' },
      { name: 'Espresso Bean', hex: '#3e2723' },
      { name: 'Sage Leaf', hex: '#4d7c0f' }
    ],
    stock: 15,
    featured: false,
    createdAt: '2026-08-16',
  },
  {
    id: 'day-3',
    title: 'Freja Smocked Gingham Prairie Midi',
    category: 'Daywear & Casual',
    silhouette: 'Fit & Flare',
    length: 'Midi',
    fabric: 'Woven Cotton Gingham & Ric-Rac Edge',
    price: 85000,
    sellerShare: 59500, // 70%
    platformShare: 25500, // 30%
    sellerId: 'seller-5',
    sellerName: 'Soleil Silk & Linen',
    sellerRating: 4.8,
    sellerSalesCount: 31,
    description: 'Charming weekend staple with stretchy smocked bodice, ruffled cap sleeves, and whimsical cotton gingham print. Perfect for farmers markets and brunch.',
    details: [
      'Generous elastic smocking across entire bodice for flexible fit',
      'Ruffle cap sleeves can be worn on or off the shoulder',
      'Deep tier skirt with delicate tonal ric-rac trim',
      'Large side inseam pockets'
    ],
    careInstructions: 'Machine wash cold; hang dry.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'French Sky Gingham', hex: '#38bdf8' },
      { name: 'Buttercup Yellow', hex: '#fde047' }
    ],
    stock: 14,
    featured: true,
    createdAt: '2026-08-18',
  },
  {
    id: 'day-4',
    title: 'Rowan Denim Utility Midi Dress',
    category: 'Daywear & Casual',
    silhouette: 'A-Line',
    length: 'Midi',
    fabric: '8oz Soft Washed Indigo Denim & Copper Rivets',
    price: 120000,
    sellerShare: 84000, // 70%
    platformShare: 36000, // 30%
    sellerId: 'seller-7',
    sellerName: 'Ejiro Bespoke',
    sellerRating: 4.9,
    sellerSalesCount: 45,
    description: 'Workwear-inspired denim day dress with button-front closure, patch utility pockets, and topstitched belt loops.',
    details: [
      '8oz lightweight breathable denim that softens with every wash',
      'Antiqued copper metal shank buttons',
      'D-ring denim belt included',
      'Triple-needle contrast amber topstitching'
    ],
    careInstructions: 'Machine wash inside out with dark colors.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Washed Vintage Indigo', hex: '#1e3a8a' },
      { name: 'Raw Dark Rinse', hex: '#0f172a' }
    ],
    stock: 10,
    featured: false,
    createdAt: '2026-08-21',
  },
  {
    id: 'day-5',
    title: 'Mia Tiered Floral Cotton Poplin Dress',
    category: 'Daywear & Casual',
    silhouette: 'A-Line',
    length: 'Maxi',
    fabric: 'Micro-Floral Printed Cotton Voile',
    price: 105000,
    sellerShare: 73500, // 70%
    platformShare: 31500, // 30%
    sellerId: 'seller-5',
    sellerName: 'Soleil Silk & Linen',
    sellerRating: 4.8,
    sellerSalesCount: 31,
    description: 'Breezy everyday floral dress featuring a notched tie neck, billowy raglan sleeves, and lightweight tiered cotton skirt.',
    details: [
      'Hand-painted watercolor floral print',
      'Elasticated wrist cuffs allow sleeves to be pushed up easily',
      'Unstructured relaxed fit through waist and hips',
      'Fully lined in soft breathable cotton'
    ],
    careInstructions: 'Machine wash cold; hang dry.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Meadow Pink', hex: '#f472b6' },
      { name: 'Coastal Bluebell', hex: '#60a5fa' }
    ],
    stock: 16,
    featured: true,
    createdAt: '2026-08-24',
  },
  {
    id: 'day-6',
    title: 'Talia Linen-Blend Wrap Day Dress',
    category: 'Daywear & Casual',
    silhouette: 'Wrap Dress',
    length: 'Midi',
    fabric: 'Cotton-Linen Slub Weave & Tortoiseshell Buckle',
    price: 98000,
    sellerShare: 68600, // 70%
    platformShare: 29400, // 30%
    sellerId: 'seller-7',
    sellerName: 'Ejiro Bespoke',
    sellerRating: 4.9,
    sellerSalesCount: 45,
    description: 'True wrap silhouette that cinches with an internal tie and external tortoiseshell D-ring. Flattering V-neck with modest coverage for work and leisure.',
    details: [
      'Internal security tie prevents gaping',
      'Tortoiseshell resin D-ring external fastening',
      'Tulip curved front hemline',
      'Breathable slub texture gives subtle artisanal depth'
    ],
    careInstructions: 'Machine wash cold; warm iron or steam.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Burnt Ochre', hex: '#b45309' },
      { name: 'Sage Green', hex: '#65a30d' }
    ],
    stock: 12,
    featured: false,
    createdAt: '2026-08-27',
  },

  // ==========================================
  // 7. VINTAGE & RETRO (6 Plenty Dresses)
  // ==========================================
  {
    id: 'vintage-1',
    title: 'Penelope 1950s Polka Dot Swing Dress',
    category: 'Vintage & Retro',
    silhouette: 'Fit & Flare',
    length: 'Midi',
    fabric: 'Crisp Cotton Sateen & Tulle Petticoat Inset',
    price: 125000,
    sellerShare: 87500, // 70%
    platformShare: 37500, // 30%
    sellerId: 'seller-8',
    sellerName: 'Vienna Vintage Archive',
    sellerRating: 4.9,
    sellerSalesCount: 52,
    description: 'Authentic 1950s mid-century swing dress reproduction with a cinched sweetheart bodice, contrast white piping, and a full 360-degree circle skirt.',
    details: [
      'Full 360-degree circle skirt that accommodates petticoats',
      'Contrasting white notched lapel collar and faux buttons',
      'Matching wide patent leather look waist belt with silver buckle',
      'Hidden side seam pockets'
    ],
    careInstructions: 'Hand wash cold or gentle machine wash; line dry.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Classic Navy & White Dot', hex: '#1e3a8a' },
      { name: 'Crimson Red & White Dot', hex: '#b91c1c' },
      { name: 'Vintage Noir Dot', hex: '#18181b' }
    ],
    stock: 14,
    featured: true,
    createdAt: '2026-08-14',
  },
  {
    id: 'vintage-2',
    title: 'Bianca 1970s Studio 54 Pleated Halter Maxi',
    category: 'Vintage & Retro',
    silhouette: 'Fit & Flare',
    length: 'Maxi',
    fabric: 'Liquid Lurex Jersey & Metallic Shimmer Weave',
    price: 185000,
    sellerShare: 129500, // 70%
    platformShare: 55500, // 30%
    sellerId: 'seller-8',
    sellerName: 'Vienna Vintage Archive',
    sellerRating: 4.9,
    sellerSalesCount: 52,
    description: 'Channelling pure 1970s discotheque glamour. Draped plunge halter neckline that flows into sunburst micro-pleated skirt with metallic thread.',
    details: [
      'Deep plunge V-neck with gold metallic ring collar',
      'Accordion micro-pleating that fans out with movement',
      'Bare open back with crisscross elastic straps',
      'Floor-skimming tiered sweep'
    ],
    careInstructions: 'Dry clean only to protect delicate pleat structure.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Liquid Champagne Gold', hex: '#d4af37' },
      { name: 'Disco Silver Chrome', hex: '#cbd5e1' }
    ],
    stock: 7,
    featured: true,
    createdAt: '2026-08-17',
  },
  {
    id: 'vintage-3',
    title: 'Colette 1920s Art Deco Beaded Flapper Shift',
    category: 'Vintage & Retro',
    silhouette: 'Shift',
    length: 'Mini',
    fabric: 'Georgette Mesh with Hand-Strung Glass Bugle Beads',
    price: 210000,
    sellerShare: 147000, // 70%
    platformShare: 63000, // 30%
    sellerId: 'seller-8',
    sellerName: 'Vienna Vintage Archive',
    sellerRating: 4.9,
    sellerSalesCount: 52,
    description: 'Intricate 1920s Art Deco geometric beadwork hand-applied onto breathable silk mesh with dynamic swinging beaded fringe hemline.',
    details: [
      'Over 10,000 hand-strung glass bugle and seed beads',
      'Scalloped hem with 15cm sway fringe that dances with every step',
      'Dropped waist flapper silhouette with comfortable stretch lining',
      'Scalloped neckline and beaded armhole borders'
    ],
    careInstructions: 'Specialist dry clean only. Store flat in cloth pouch.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Roaring 20s Gold & Black', hex: '#18181b' },
      { name: 'Vintage Emerald Deco', hex: '#064e3b' }
    ],
    stock: 6,
    featured: false,
    createdAt: '2026-08-19',
  },
  {
    id: 'vintage-4',
    title: 'Marianne 1940s Tea Dance Crepe Dress',
    category: 'Vintage & Retro',
    silhouette: 'A-Line',
    length: 'Midi',
    fabric: 'Rayon Viscose Crepe with Floral Chintz Print',
    price: 115000,
    sellerShare: 80500, // 70%
    platformShare: 34500, // 30%
    sellerId: 'seller-8',
    sellerName: 'Vienna Vintage Archive',
    sellerRating: 4.9,
    sellerSalesCount: 52,
    description: 'Wartime utility elegance reproduction. Features gathered shoulder yokes, padded cap sleeves, sweetheart bust, and gently flared A-line tea skirt.',
    details: [
      'Lightweight internal shoulder pads for signature 40s silhouette',
      'Covered button detail down center bodice',
      'Tie-back waist ribbons for customizable fit',
      'Original archival 1944 floral chintz print reproduction'
    ],
    careInstructions: 'Hand wash cold or dry clean.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Primrose Red', hex: '#991b1b' },
      { name: 'Navy Garden', hex: '#1e3a8a' }
    ],
    stock: 11,
    featured: false,
    createdAt: '2026-08-22',
  },
  {
    id: 'vintage-5',
    title: 'Gwendolyn Victorian High-Neck Velvet Midi',
    category: 'Vintage & Retro',
    silhouette: 'Fit & Flare',
    length: 'Midi',
    fabric: 'Plush Cotton Velvet & Ivory Guipure Lace Collar',
    price: 175000,
    sellerShare: 122500, // 70%
    platformShare: 52500, // 30%
    sellerId: 'seller-8',
    sellerName: 'Vienna Vintage Archive',
    sellerRating: 4.9,
    sellerSalesCount: 52,
    description: 'Neo-Victorian gothic romance. Heavy plush cotton velvet with contrast detachable guipure lace high collar and cameo brooch pin.',
    details: [
      'Detachable French guipure lace collar with pearl button fastener',
      'Dramatic leg-of-mutton gigot sleeves with tailored wrist cuffs',
      'Corselet waistline with flattering chevron cut',
      'Concealed back zip with velvet pull tab'
    ],
    careInstructions: 'Dry clean only. Hang on wide padded hanger.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Gothic Noir Velvet', hex: '#09090b' },
      { name: 'Royal Plum Velvet', hex: '#581c87' }
    ],
    stock: 8,
    featured: true,
    createdAt: '2026-08-25',
  },
  {
    id: 'vintage-6',
    title: 'Brigitte 1960s Mod Colorblock Shift Mini',
    category: 'Vintage & Retro',
    silhouette: 'Shift',
    length: 'Mini',
    fabric: 'Double-Knit Ponte Jacquard',
    price: 130000,
    sellerShare: 91000, // 70%
    platformShare: 39000, // 30%
    sellerId: 'seller-8',
    sellerName: 'Vienna Vintage Archive',
    sellerRating: 4.9,
    sellerSalesCount: 52,
    description: 'Swinging London mod mini featuring graphic Mondrian-inspired geometric colorblocking, a mock turtleneck, and brass exposed back zipper.',
    details: [
      'Architectural double-knit ponte maintains clean boxy structure',
      'Chunky antiqued brass exposed back zipper with round pull ring',
      'Sleeveless armholes finished with clean bias binding',
      'Above-the-knee 1960s authentic cut'
    ],
    careInstructions: 'Machine wash cold on gentle cycle; iron on reverse.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Mod Mustard & Cream', hex: '#ca8a04' },
      { name: 'Graphic Black & White', hex: '#18181b' }
    ],
    stock: 13,
    featured: false,
    createdAt: '2026-08-28',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-89214',
    buyerId: 'buyer-1',
    buyerName: 'Sophia Sterling',
    buyerEmail: 'sophia.sterling@example.com',
    items: [
      {
        product: INITIAL_DRESSES[0], // Seraphina Emerald Velvet Mermaid Gown (₦380,000)
        selectedSize: 'S',
        selectedColor: { name: 'Emerald Velvet Green', hex: '#064e3b' },
        quantity: 1,
      }
    ],
    totalAmount: 380000,
    sellerTotalShare: 266000, // 70%
    platformTotalShare: 114000, // 30%
    status: 'shipped',
    trackingNumber: 'DHL-EXPRESS-938210482',
    carrier: 'DHL Express Atelier Couture',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    shippingAddress: {
      fullName: 'Sophia Sterling',
      street: '14 Alexander Avenue, Ikoyi',
      city: 'Lagos',
      state: 'Lagos State',
      zip: '101233',
      country: 'Nigeria',
    },
    paymentMethod: 'apple_pay',
    paymentLast4: '4242',
    directTransferReference: 'NIBSS-DIR-94810294',
    buyerAccountDetails: {
      bankName: 'Guaranty Trust Bank (GTBank)',
      accountNumber: '0129481920',
      accountName: 'Sophia Sterling',
      bankCode: '058',
      bvnVerified: true,
      settlementSpeed: 'instant',
    },
    sellerSettlements: [
      {
        sellerId: 'seller-1',
        sellerName: 'Atelier Laurent Paris',
        bankName: 'First Bank of Nigeria',
        accountNumber: '3104928192',
        accountName: 'Atelier Laurent Couture Ltd',
        amount: 266000,
        transferReference: 'NIBSS-DIR-94810294',
        settledAt: '2026-09-02T14:30:05Z',
        status: 'instant_settled',
      }
    ],
    createdAt: '2026-09-02T14:30:00Z',
    checkpoints: [
      {
        id: 'cp-1',
        status: 'placed',
        title: 'Order Placed & Escrow Secured',
        description: 'Payment verified securely. 70% (₦266,000) allocated to Atelier Laurent Paris, 30% (₦114,000) to Platform account.',
        location: 'Lagos, Nigeria',
        timestamp: 'Sep 2, 2:30 PM',
        completed: true,
      },
      {
        id: 'cp-2',
        status: 'confirmed',
        title: 'Tailor Studio Acceptance & Sizing Verified',
        description: 'Atelier Laurent Paris verified Size S specifications and inspected velvet fabric quality.',
        location: 'Atelier Couture Hub',
        timestamp: 'Sep 2, 3:45 PM',
        completed: true,
      },
      {
        id: 'cp-3',
        status: 'tailoring',
        title: 'Custom Steam Pressing & Garment Packaging',
        description: 'Hand-pressed with steam, wrapped in breathable acid-free garment tissue with travel dustbag.',
        location: 'Fulfillment Logistics Suite',
        timestamp: 'Sep 3, 9:15 AM',
        completed: true,
      },
      {
        id: 'cp-4',
        status: 'shipped',
        title: 'Air Freight Transit - In Flight',
        description: 'Dispatched via DHL Express Flight #NG8839. Customs clearance documentation approved.',
        location: 'In Transit - En Route to Lagos Delivery Center',
        timestamp: 'Sep 4, 1:10 AM',
        completed: true,
      },
      {
        id: 'cp-5',
        status: 'out_for_delivery',
        title: 'Out for Local Courier Delivery',
        description: 'Courier van loaded. Signature verification required upon receipt.',
        location: 'Ikoyi Regional Delivery Hub',
        timestamp: 'Estimated Sep 5, 9:00 AM',
        completed: false,
      },
      {
        id: 'cp-6',
        status: 'delivered',
        title: 'Delivered & Buyer Confirmation',
        description: 'Package handed directly to resident. 7-day buyer fit guarantee active.',
        location: 'Ikoyi, Lagos',
        timestamp: 'Pending Delivery',
        completed: false,
      }
    ]
  },
  {
    id: 'ORD-71203',
    buyerId: 'buyer-1',
    buyerName: 'Sophia Sterling',
    buyerEmail: 'sophia.sterling@example.com',
    items: [
      {
        product: INITIAL_DRESSES[7], // Dahlia Botanical Embroidered Wedding Guest Midi (₦240,000)
        selectedSize: 'M',
        selectedColor: { name: 'Blush Floral', hex: '#fed7aa' },
        quantity: 1,
      }
    ],
    totalAmount: 240000,
    sellerTotalShare: 168000, // 70%
    platformTotalShare: 72000, // 30%
    status: 'delivered',
    trackingNumber: 'FDX-PRIORITY-849102741',
    carrier: 'FedEx Luxury Garment Express',
    estimatedDelivery: 'Delivered',
    shippingAddress: {
      fullName: 'Sophia Sterling',
      street: '14 Alexander Avenue, Ikoyi',
      city: 'Lagos',
      state: 'Lagos State',
      zip: '101233',
      country: 'Nigeria',
    },
    paymentMethod: 'card',
    paymentLast4: '8821',
    createdAt: '2026-08-28T10:15:00Z',
    checkpoints: [
      {
        id: 'cp-201',
        status: 'placed',
        title: 'Order Placed & Escrow Allocated',
        description: '70% (₦168,000) reserved for Soleil Silk, 30% (₦72,000) platform fee.',
        location: 'Lagos, Nigeria',
        timestamp: 'Aug 28, 10:15 AM',
        completed: true,
      },
      {
        id: 'cp-202',
        status: 'shipped',
        title: 'Dispatched from Coastal Atelier Studio',
        description: 'Carrier picked up package.',
        location: 'Victoria Island Logistics Hub',
        timestamp: 'Aug 29, 2:00 PM',
        completed: true,
      },
      {
        id: 'cp-203',
        status: 'delivered',
        title: 'Delivered to Doorstep',
        description: 'Signed by recipient: S. Sterling.',
        location: 'Ikoyi, Lagos',
        timestamp: 'Aug 31, 1:40 PM',
        completed: true,
      }
    ]
  }
];

export const INITIAL_BUYER: User = {
  id: 'buyer-1',
  name: 'Sophia Sterling',
  email: 'sophia.sterling@example.com',
  role: 'buyer',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  provider: 'facebook',
  joinedDate: '2024',
  buyerAccount: {
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '0129481920',
    accountName: 'Sophia Sterling',
    bankCode: '058',
    bvnVerified: true,
    settlementSpeed: 'instant',
  },
  measurements: {
    bust: '34B',
    waist: '26 in',
    hips: '37 in',
    height: "5'7\"",
    preferredSize: 'S'
  },
  shippingAddress: {
    street: '14 Alexander Avenue, Ikoyi',
    city: 'Lagos',
    state: 'Lagos State',
    zip: '101233',
    country: 'Nigeria'
  }
};

export const INITIAL_SELLERS: User[] = [
  {
    id: 'seller-1',
    name: 'Laurent Mercier',
    email: 'laurent@atelierlaurent.com',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    provider: 'google',
    storeName: 'Atelier Laurent Paris',
    storeBio: 'Haute couture & bespoke evening gowns handcrafted in small batches.',
    storeBanner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    joinedDate: '2023',
    payoutAccount: {
      bankName: 'First Bank of Nigeria',
      accountNumber: '3104928192',
      accountName: 'Atelier Laurent Couture Ltd',
      bankCode: '011',
      bvnVerified: true,
      settlementSpeed: 'instant',
    },
  },
  {
    id: 'seller-2',
    name: 'Deola Sagoe',
    email: 'deola@deolaatelier.com',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    provider: 'facebook',
    storeName: 'Deola Atelier Lagos',
    storeBio: 'Pioneering African haute couture and majestic bridal ball gowns.',
    storeBanner: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
    joinedDate: '2023',
    payoutAccount: {
      bankName: 'Access Bank',
      accountNumber: '0092841928',
      accountName: 'Deola Sagoe Atelier Ltd',
      bankCode: '044',
      bvnVerified: true,
      settlementSpeed: 'instant',
    },
  },
  {
    id: 'seller-3',
    name: 'Reni Folawiyo',
    email: 'reni@alaralagos.com',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    provider: 'apple',
    storeName: 'Alara Couture',
    storeBio: 'Contemporary luxury dresses, hand-embellished silk slips, and architectural silhouettes.',
    storeBanner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
    joinedDate: '2024',
    payoutAccount: {
      bankName: 'Zenith Bank',
      accountNumber: '2081948271',
      accountName: 'Alara Couture Lagos Ltd',
      bankCode: '057',
      bvnVerified: true,
      settlementSpeed: 'instant',
    },
  }
];
