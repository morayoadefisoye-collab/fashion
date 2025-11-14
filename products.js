// Shared product catalog for the Fashion District demo.
// This file exposes a global `PRODUCTS` array so pages can use the same data without duplication.
window.PRODUCTS = [
  {id:1,category:'clothes',name:'Silk Satin Dress Fabric',desc:'Lustrous silk satin — 44" width',price:18.5,img:'https://images.unsplash.com/photo-1520975911926-6f79d93d9b31?auto=format&fit=crop&w=800&q=60'},
  {id:2,category:'clothes',name:'Organic Cotton',desc:'Soft cotton ideal for shirts and dresses',price:7.99,img:'https://images.unsplash.com/photo-1534751516642-a1af1ef0f3ca?auto=format&fit=crop&w=800&q=60'},
  {id:3,category:'clothes',name:'Wool Blend Suiting',desc:'Warm wool blend — suiting weight',price:20.0,img:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=60'},
  {id:4,category:'shoes',name:'Leather Sneaker Upper',desc:'Premium leather for sneaker production',price:22.0,img:'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60'},
  {id:5,category:'shoes',name:'Suede Trim',desc:'Suede pieces for heels and boots',price:6.0,img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=60'},
  {id:6,category:'caps',name:'Snapback Cap',desc:'Structured snapback style cap',price:12.5,img:'https://images.unsplash.com/photo-1531346715088-2f3c2b3b1d44?auto=format&fit=crop&w=800&q=60'},
  {id:7,category:'accessories',name:'Leather Belt',desc:'Full-grain leather belt',price:15.0,img:'https://images.unsplash.com/photo-1600180758890-0e6a08a4b3d5?auto=format&fit=crop&w=800&q=60'},
  {id:8,category:'eyewear',name:'Classic Sunglasses',desc:'Timeless square sunglasses frame',price:24.99,img:'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60'},
  {id:9,category:'accessories',name:'Lace Trim',desc:'Delicate lace for finishing',price:4.5,img:'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=60'},
  {id:10,category:'clothes',name:'Chiffon',desc:'Lightweight chiffon for drape',price:9.25,img:'https://images.unsplash.com/photo-1508898578281-774ac4893a37?auto=format&fit=crop&w=800&q=60'},
  {id:11,category:'clothes',name:'Denim Twill',desc:'Classic denim for jeans and jackets',price:13.5,img:'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=800&q=60'},
  {id:12,category:'clothes',name:'Linen',desc:'Breathable linen for summer wear',price:11.0,img:'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60'},
  {id:13,category:'clothes',name:'Velvet',desc:'Soft stretch velvet — evening wear',price:17.0,img:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=60'},
  {id:14,category:'shoes',name:'Rubber Soles',desc:'Durable rubber soles for streetwear',price:8.5,img:'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=60'},
  {id:15,category:'shoes',name:'Canvas Upper',desc:'Versatile canvas for loafers and sneakers',price:5.5,img:'https://images.unsplash.com/photo-1526178619227-0533f3b2b6c7?auto=format&fit=crop&w=800&q=60'},
  {id:16,category:'caps',name:'Dad Cap',desc:'Soft unstructured dad cap',price:9.0,img:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=60'},
  {id:17,category:'accessories',name:'Buttons Pack',desc:'Assorted buttons for tailoring',price:3.5,img:'https://images.unsplash.com/photo-1615398194129-0b4f0a1f8d9b?auto=format&fit=crop&w=800&q=60'},
  {id:18,category:'eyewear',name:'Reading Glasses',desc:'Lightweight reading frames',price:19.0,img:'https://images.unsplash.com/photo-1521120098172-6b5b86b32a51?auto=format&fit=crop&w=800&q=60'},
  {id:19,category:'clothes',name:'Performance Jersey',desc:'Breathable athletic fabric',price:6.99,img:'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60'},
  {id:20,category:'accessories',name:'Shoe Laces',desc:'Durable shoelaces in multiple colors',price:2.5,img:'https://images.unsplash.com/photo-1526178619227-0533f3b2b6c7?auto=format&fit=crop&w=800&q=60'},
  {id:21,category:'clothes',name:'Faux Fur',desc:'Soft faux fur for trims',price:14.0,img:'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60'},
  {id:22,category:'caps',name:'Bucket Hat',desc:'Casual bucket hat',price:10.0,img:'https://images.unsplash.com/photo-1508898578281-774ac4893a37?auto=format&fit=crop&w=800&q=60'},
  {id:23,category:'shoes',name:'Heel Caps',desc:'Protective heel caps',price:1.99,img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=60'},
  {id:24,category:'accessories',name:'Eyewear Case',desc:'Protective case for glasses',price:4.99,img:'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60'}
];

// Example products for newly added categories
window.PRODUCTS.push(
  {id:25,category:'bags',name:'Canvas Tote Bag',desc:'Sturdy canvas tote for retail and samples',price:8.99,img:'https://images.unsplash.com/photo-1520975911926-6f79d93d9b31?auto=format&fit=crop&w=800&q=60'},
  {id:26,category:'beauty',name:'Lipstick Bulk Pack',desc:'Assorted shades for retail displays',price:5.5,img:'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60'},
  {id:27,category:'office',name:'Stationery Set',desc:'Pens, clips and pads for office supplies',price:6.0,img:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60'},
  {id:28,category:'automotive',name:'Car Seat Fabric Swatch',desc:'Durable upholstery fabric for automotive',price:12.0,img:'https://images.unsplash.com/photo-1511910849309-7f5a2d9a6e2d?auto=format&fit=crop&w=800&q=60'},
  {id:29,category:'crafts',name:'Craft Ribbon Pack',desc:'Colorful ribbons for decorations and crafts',price:3.25,img:'https://images.unsplash.com/photo-1520975911926-6f79d93d9b31?auto=format&fit=crop&w=800&q=60'},
  {id:30,category:'household',name:'Microfiber Cloth',desc:'Multi-use household cleaning cloths',price:2.5,img:'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=60'},
  {id:31,category:'partydecorations',name:'Foil Balloon Set',desc:'Assorted foil balloons and ribbons',price:9.99,img:'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=60'},

  // Additional samples for each new category
  {id:32,category:'bags',name:'Leather Crossbody',desc:'Compact leather crossbody bag',price:24.99,img:'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60'},
  {id:33,category:'bags',name:'Travel Duffel',desc:'Durable duffel bag for weekend trips',price:39.0,img:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=60'},

  {id:34,category:'beauty',name:'Nail Polish Set',desc:'Assorted colors, 12-pack',price:7.99,img:'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=60'},
  {id:35,category:'beauty',name:'Facial Sheet Mask Pack',desc:'Hydrating sheet masks, pack of 5',price:6.5,img:'https://images.unsplash.com/photo-1541534401786-5f2d6d7f6a6a?auto=format&fit=crop&w=800&q=60'},
  {id:36,category:'beauty',name:'Perfume Sample Set',desc:'Mini fragrance samples for retail',price:12.0,img:'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60'},

  {id:37,category:'office',name:'Desk Organizer',desc:'Wooden desk organizer with compartments',price:14.5,img:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60'},
  {id:38,category:'office',name:'Sticky Notes Pack',desc:'Assorted sticky notes for office use',price:2.99,img:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=60'},
  {id:39,category:'office',name:'Stapler Set',desc:'Stapler with staples and remover',price:5.0,img:'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=60'},

  {id:40,category:'automotive',name:'Windshield Cleaner',desc:'Streak-free cleaner for glass',price:4.5,img:'https://images.unsplash.com/photo-1511910849309-7f5a2d9a6e2d?auto=format&fit=crop&w=800&q=60'},
  {id:41,category:'automotive',name:'Seat Cover (Universal)',desc:'Universal fit seat cover set',price:29.99,img:'https://images.unsplash.com/photo-1541446654331-1f9c9b7d0b6b?auto=format&fit=crop&w=800&q=60'},
  {id:42,category:'automotive',name:'Car Air Freshener Pack',desc:'Multi-pack of scented fresheners',price:3.75,img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60'},

  {id:43,category:'crafts',name:'Acrylic Paint Set',desc:'12-color acrylic paint set',price:9.99,img:'https://images.unsplash.com/photo-1520975911926-6f79d93d9b31?auto=format&fit=crop&w=800&q=60'},
  {id:44,category:'crafts',name:'Craft Scissors Pack',desc:'Precision scissors for paper and fabric',price:6.25,img:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=60'},
  {id:45,category:'crafts',name:'Beads & String Kit',desc:'Assorted beads and string for jewelry',price:4.75,img:'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=60'},

  {id:46,category:'household',name:'Multipurpose Cleaner',desc:'All-surface cleaning spray',price:3.99,img:'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=60'},
  {id:47,category:'household',name:'Kitchen Towels (3-pack)',desc:'Absorbent cotton kitchen towels',price:7.5,img:'https://images.unsplash.com/photo-1508898578281-774ac4893a37?auto=format&fit=crop&w=800&q=60'},
  {id:48,category:'household',name:'LED Light Bulbs (4-pack)',desc:'Energy-saving LED bulbs',price:9.0,img:'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60'},

  {id:49,category:'partydecorations',name:'Paper Lanterns',desc:'Set of 6 colorful paper lanterns',price:11.99,img:'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=60'},
  {id:50,category:'partydecorations',name:'Banner Kit',desc:'Customizable party banner kit',price:6.5,img:'https://images.unsplash.com/photo-1520975911926-6f79d93d9b31?auto=format&fit=crop&w=800&q=60'},
  {id:51,category:'partydecorations',name:'Confetti Mix',desc:'Biodegradable confetti pack',price:2.99,img:'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=60'},
  {id:52,category:'partydecorations',name:'Streamer Set',desc:'Assorted streamers and tassels',price:4.25,img:'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=60'}
);
