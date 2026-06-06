export interface MenuItem {
  id: string;
  name: string;
  price: number | string; // Some have dual pricing like "325/345" or Half/Full
  priceHalf?: number;
  priceFull?: number;
  description: string;
  isVeg: boolean;
  isPopular?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "net-practice",
    title: "Net Practice",
    subtitle: "Premium Coffees & Hot Brews",
    items: [
      { id: "np-1", name: "Cafe Latte", price: 185, description: "Smooth espresso blended with steamed milk and topped with a delicate layer of foam.", isVeg: true },
      { id: "np-2", name: "Cappuccino", price: 185, description: "Rich double espresso combined with equal parts steamed milk and warm milk froth.", isVeg: true, isPopular: true },
      { id: "np-3", name: "Espresso (Single/Double)", price: "135/165", description: "Bold and intense shot of pure, freshly brewed coffee under high pressure.", isVeg: true },
      { id: "np-4", name: "Americano", price: 165, description: "Freshly pulled espresso shots diluted with hot water for a smooth black coffee experience.", isVeg: true },
      { id: "np-5", name: "Cafe Mocha", price: 189, description: "Indulgent blend of rich espresso, dark chocolate sauce, and steamed milk with whipped cream.", isVeg: true },
      { id: "np-6", name: "Cold Coffee", price: 189, description: "Chilled espresso blended creamy milk and vanilla ice cream, served frosty.", isVeg: true, isPopular: true },
      { id: "np-7", name: "Iced Cappuccino", price: 169, description: "Double shot of espresso over ice, topped with a velvety layer of cold milk foam.", isVeg: true },
      { id: "np-8", name: "Iced Americano", price: 149, description: "Espresso shots served over ice and chilled water, a refreshing pick-me-up.", isVeg: true },
      { id: "np-9", name: "Coffee Frappe", price: 199, description: "Thick, blended icy coffee shake infused with chocolate drizzle and premium beans.", isVeg: true },
      { id: "np-10", name: "Lemon Ice Tea", price: 155, description: "Chilled black tea infused with natural lemon juice and fresh mint leaves.", isVeg: true },
      { id: "np-11", name: "Green Tea", price: 155, description: "Light and clean antioxidant-rich hot tea brewed from premium organic leaves.", isVeg: true },
      { id: "np-12", name: "Masala Chai", price: 100, description: "Traditional Indian milk tea simmered with a house blend of cardamom, ginger, and cloves.", isVeg: true, isPopular: true }
    ]
  },
  {
    id: "drinks-break",
    title: "Drinks Break",
    subtitle: "Cinematic Mocktails & Shakes",
    items: [
      { id: "db-1", name: "Black Magic", price: 175, description: "An enchanting dark soda mocktail infused with black currant, lime, and activated elements.", isVeg: true, isPopular: true },
      { id: "db-2", name: "Fresh Lime Soda (Sweet/Salted)", price: 125, description: "Classic refreshing carbonated cooler made with fresh lime juice, sweet syrup, or black salt.", isVeg: true },
      { id: "db-3", name: "Mint Mojito", price: 175, description: "Muddled fresh garden mint and lime wedges, topped with sparkling water and cane sugar syrup.", isVeg: true, isPopular: true },
      { id: "db-4", name: "Strawberry Mojito", price: 175, description: "Fruity twist to the classic mojito, featuring fresh strawberry compote and cooling mint.", isVeg: true },
      { id: "db-5", name: "Blue Shoe", price: 175, description: "Vibrant blue curacao syrup shaken with sweet and sour mix, topped with sprite and a lime wheel.", isVeg: true },
      { id: "db-6", name: "Mewa Lassi", price: 175, description: "Thick, rich Punjabi lassi blended with saffron, cardamon, and loaded with crushed dry fruits.", isVeg: true, isPopular: true },
      { id: "db-7", name: "Green Apple Fizz", price: 175, description: "Crisp green apple syrup combined with freshly squeezed lime and sparkling club soda.", isVeg: true },
      { id: "db-8", name: "Jeera Butter Mint", price: 175, description: "Unique digestive cooler blending spiced cumin, fresh buttermilk, and crushed mint.", isVeg: true },
      { id: "db-9", name: "Coke/Pepsi", price: 70, description: "Served chilled with ice and a lemon wedge.", isVeg: true },
      { id: "db-10", name: "7 UP/Sprite", price: 70, description: "Crisp and clear lemon-lime fizzy soda served over ice.", isVeg: true }
    ]
  },
  {
    id: "milkshakes",
    title: "Milkshakes",
    subtitle: "Thick Shakes & Energy Blends",
    items: [
      { id: "ms-1", name: "Hazelnut Shake", price: 195, description: "Creamy blend of vanilla ice cream, premium milk, and rich hazelnut praline paste.", isVeg: true },
      { id: "ms-2", name: "Chocolate Shake", price: 195, description: "Decadent chocolate ice cream blended with dark cocoa powder and rich milk chocolate fudge.", isVeg: true },
      { id: "ms-3", name: "Strawberry Shake", price: 195, description: "Sweet, velvet-smooth milkshake loaded with natural strawberry puree and vanilla beans.", isVeg: true },
      { id: "ms-4", name: "Butterscotch Shake", price: 195, description: "Rich butterscotch bits blended with creamy vanilla soft serve and warm butter caramel.", isVeg: true },
      { id: "ms-5", name: "Vanilla Shake", price: 195, description: "Classic simple milkshake prepared with premium Madagascar vanilla extract and whole milk.", isVeg: true },
      { id: "ms-6", name: "Mango Shake", price: 195, description: "Tropical summer milkshake made with rich Alphonso mango pulp and vanilla ice cream.", isVeg: true, isPopular: true },
      { id: "ms-7", name: "Red Bull", price: 175, description: "Chilled energy drink can to keep your stadium spirits charged.", isVeg: true }
    ]
  },
  {
    id: "pitch-report",
    title: "Pitch Report",
    subtitle: "Warm & Comforting Soups",
    items: [
      { id: "pr-1", name: "Sweet Corn Soup (Veg/Chicken)", price: "165/205", description: "Creamy American sweet corn broth simmered with finely chopped garden greens or tender chicken.", isVeg: true },
      { id: "pr-2", name: "Manchow Soup (Veg/Chicken)", price: "165/205", description: "Spicy Indo-Chinese dark soup infused with garlic, ginger, and soy sauce, topped with crispy noodles.", isVeg: true, isPopular: true },
      { id: "pr-3", name: "Egg Drop Chicken Soup", price: 205, description: "Velvety chicken broth with thin ribbons of beaten egg swirled in, seasoned with white pepper.", isVeg: false },
      { id: "pr-4", name: "Lemon Coriander Soup (Veg/Chicken)", price: "165/205", description: "Clear, tangy vegetable broth loaded with fresh coriander leaves, lemon juice, and root vegetables.", isVeg: true },
      { id: "pr-5", name: "Hot-N-Sour Soup (Veg/Chicken)", price: "165/205", description: "Zesty dark broth loaded with wild mushrooms, bamboo shoots, tofu, and balanced sour-spicy notes.", isVeg: true },
      { id: "pr-6", name: "Cream Of Soup (Veg/Tomato/Chicken)", price: "165/165/205", description: "Velvety pureed soup prepared with heavy butter cream, roasted tomatoes, field mushrooms, or chicken broth.", isVeg: true }
    ]
  },
  {
    id: "green-field",
    title: "Green Field",
    subtitle: "Fresh Salads & Health Greens",
    items: [
      { id: "gf-1", name: "Garden Fresh Salad", price: 155, description: "Slices of fresh cucumber, organic carrots, onions, tomatoes, and green chillies with lime.", isVeg: true },
      { id: "gf-2", name: "Paneer BBQ Salad", price: 325, description: "Cottage cheese cubes tossed with chargrilled bell peppers, cherry tomatoes, and sweet BBQ dressing.", isVeg: true },
      { id: "gf-3", name: "Chicken BBQ Salad", price: 355, description: "Juicy shredded roasted chicken breast tossed with field greens, olives, and signature smokehouse BBQ vinaigrette.", isVeg: false, isPopular: true }
    ]
  },
  {
    id: "drs",
    title: "DRS (Diet Review System)",
    subtitle: "Gourmet Club Sandwiches",
    items: [
      { id: "drs-1", name: "Veg Club Sandwich", price: 325, description: "Double-decker toasted sandwich layered with crisp lettuce, fresh tomato, cucumber, cheese, and herb spread.", isVeg: true },
      { id: "drs-2", name: "Non Veg Club Sandwich", price: 375, description: "Premium double-decker loaded with grilled chicken breast, fried egg, cheese slices, crispy veggies, and garlic aioli.", isVeg: false, isPopular: true }
    ]
  },
  {
    id: "indian-tandoor",
    title: "Indian Tandoor",
    subtitle: "Clay-Oven Charred Kebabs & Platters",
    items: [
      { id: "it-v1", name: "Assorted Veg Platter", price: 405, description: "An exquisite grand selection of paneer tikka, tandoori mushrooms, veg kebab, and grilled soya chaap.", isVeg: true, isPopular: true },
      { id: "it-v2", name: "Paneer Tikka", price: 385, description: "Fresh cottage cheese cubes marinated in spiced hung curd, cooked over charcoal flame with bell peppers.", isVeg: true },
      { id: "it-v3", name: "Paneer Achari Tikka", price: 385, description: "Cottage cheese chunks infused with fiery pickles, mustard oil, and tandoori spices, smoked to perfection.", isVeg: true },
      { id: "it-v4", name: "Paneer Hariyali Tikka", price: 385, description: "Paneer cubes marinated in a vibrant green paste of fresh spinach, mint, coriander, and home spices.", isVeg: true },
      { id: "it-v5", name: "Paneer Lehsuni Tikka", price: 385, description: "Garlic-forward chargrilled paneer cubes with a rich coating of cream, cheese, and crushed green chillies.", isVeg: true },
      { id: "it-v6", name: "Paneer Malai Tikka", price: 385, description: "Mouth-melting paneer cubes marinated in cream cheese, cardamon powder, cashew paste, and light spices.", isVeg: true, isPopular: true },
      { id: "it-v7", name: "Paneer 65", price: 385, description: "Crispy fried cottage cheese chunks tossed in curry leaves, yogurt, and hot red chilli paste.", isVeg: true },
      { id: "it-v8", name: "Multani Mushroom", price: 385, description: "Plump mushrooms stuffed with cream cheese and minced spinach, coated in a yellow gram flour batter and charred.", isVeg: true },
      { id: "it-v9", name: "Tandoori Mushroom", price: 385, description: "Whole button mushrooms marinated in classic red tandoori masala and chargrilled.", isVeg: true },
      { id: "it-v10", name: "Veg Tandoori Momos", price: 385, description: "Steamed vegetable dumplings coated in tandoori paste and roasted in the clay oven.", isVeg: true },
      { id: "it-v11", name: "Veg Galouti Kebab", price: 390, description: "Silky, melt-in-the-mouth vegetable patties spiced with exotic Awadhi herbs and pan-fried.", isVeg: true },
      { id: "it-v12", name: "Tandoori Soya Chaap", price: 385, description: "Soyabean chops marinated in spicy tandoori curd, skewered and charred to a chewy texture.", isVeg: true },
      { id: "it-v13", name: "Tandoori Stuff Soya Chaap", price: 390, description: "Soya chaap stuffed with dry fruits, paneer crumbs, and spices, marinated in cream and grilled.", isVeg: true },
      
      { id: "it-n1", name: "Angara Murg (Half/Full)", price: "330/545", description: "Fiery, dry-spiced tandoori chicken marinated in red hot chillies and mustard oil.", isVeg: false },
      { id: "it-n2", name: "Murgh Tikka", price: 380, description: "Boneless chicken cubes marinated in spicy yogurt and cooked over open charcoal fires.", isVeg: false, isPopular: true },
      { id: "it-n3", name: "Murgh Malai Tikka", price: 390, description: "Decadent, creamy chicken pieces marinated in cream, cheese, green cardamom, and cashew paste.", isVeg: false, isPopular: true },
      { id: "it-n4", name: "Murgh Hariyali Tikka", price: 380, description: "Boneless chicken pieces grilled with mint, coriander, ginger-garlic paste, and house spices.", isVeg: false },
      { id: "it-n5", name: "Murgh Reshmi Tikka", price: 380, description: "Chicken cubes coated in egg white batter, cashew paste, and light spices, resulting in a soft texture.", isVeg: false },
      { id: "it-n6", name: "Murgh Achari Tikka", price: 380, description: "Chicken chunks cooked with tang of pickling spices, fenugreek, and mustard seeds.", isVeg: false },
      { id: "it-n7", name: "Murgh Lehsuni Tikka", price: 380, description: "Garlic-infused chicken cubes charred, delivering a rich smokey garlic flavor.", isVeg: false },
      { id: "it-n8", name: "Fish Tikka", price: 390, description: "Chunks of fresh river fish marinated in carom seeds (ajwain), tandoori spices, and charred.", isVeg: false },
      { id: "it-n9", name: "Amritsari Fish Fry", price: 390, description: "Crispy gram-flour battered fish fillets flavored with ajwain, deep-fried to golden perfection.", isVeg: false, isPopular: true },
      { id: "it-n10", name: "Methi Fish", price: 390, description: "Fish tikka marinated with fresh fenugreek leaves, yogurt, spices, and grilled in tandoor.", isVeg: false },
      { id: "it-n11", name: "Non Veg Tandoori Platter", price: 545, description: "Grand non-veg assortment containing chicken tikka, fish tikka, seekh kebabs, and chicken momos.", isVeg: false, isPopular: true },
      { id: "it-n12", name: "Seekh Kabab (Gosht/Murgh)", price: "440/380", description: "Minced mutton or chicken spiced with green chillies, mint, and cilantro, skewered and charcoal-roasted.", isVeg: false },
      { id: "it-n13", name: "Mutton Galouti Kebab", price: 465, description: "Melt-in-mouth minced lamb patties smoked with cloves and ghee, pan-fried in copper tawa.", isVeg: false, isPopular: true },
      { id: "it-n14", name: "Irani Kalmi Kebab", price: 455, description: "Juicy chicken drumsticks marinated in rich saffron, cream, and egg yolk batter, grilled.", isVeg: false },
      { id: "it-n15", name: "Chicken Tandoori Momos", price: 375, description: "Chicken mince dumplings charred in tandoor, tossed with butter and chaat masala.", isVeg: false },
      { id: "it-n16", name: "Tandoori Prawns", price: 630, description: "Jumbo prawns marinated in a classic yellow mustard and lemon-garlic yogurt paste, tandoor grilled.", isVeg: false }
    ]
  },
  {
    id: "behind-the-wicket",
    title: "Behind the Wicket",
    subtitle: "Pan-Asian Starters & Crispy Bites",
    items: [
      { id: "btw-v1", name: "Corn Salt and Pepper", price: 355, description: "Crispy golden sweet corn kernels tossed with crushed black pepper, sea salt, and scallions.", isVeg: true, isPopular: true },
      { id: "btw-v2", name: "Crispy Veg Hot And Spicy", price: 355, description: "Battered seasonal vegetables crisp-fried and tossed in a sweet-spicy Szechuan sauce.", isVeg: true },
      { id: "btw-v3", name: "Paneer Chilli (Dry/Gravy)", price: "355/375", description: "Cottage cheese cubes stir-fried with capsicum, red onions, garlic, and hot soy chilli sauce.", isVeg: true },
      { id: "btw-v4", name: "Crispy Chilli Babycorn", price: 355, description: "Tender baby corn spears golden-fried and tossed in a sticky spicy garlic-soy reduction.", isVeg: true, isPopular: true },
      { id: "btw-v5", name: "Veg Spring Roll", price: 355, description: "Crisp flaky wrappers stuffed with stir-fried cabbage, carrots, sprouts, served with hot garlic dip.", isVeg: true },
      { id: "btw-v6", name: "Honey Chilli Potato", price: 355, description: "Golden potato fingers glazed with organic honey and fiery red chilli sauce, sprinkled with sesame.", isVeg: true },
      { id: "btw-v7", name: "Gobhi Manchurian Dry", price: 355, description: "Crisp cauliflower florets coated in cornstarch, fried, and tossed in tang of dark soy-onion glaze.", isVeg: true },
      { id: "btw-v8", name: "Veg Dimsum (Steam/Fried)", price: "355/375", description: "Delicate translucent wrappers packed with minced garden vegetables and steamed or crisp-fried.", isVeg: true },
      { id: "btw-v9", name: "Chilli Dimsum", price: 390, description: "Steamed veg dumplings tossed in a hot and spicy house-made chilli oil and toasted garlic.", isVeg: true },
      
      { id: "btw-n1", name: "Chilli Chicken (Dry/Gravy)", price: "355/375", description: "Battered chicken bites stir-fried with green chillies, sweet peppers, garlic, and dark soy.", isVeg: false, isPopular: true },
      { id: "btw-n2", name: "Chicken 65", price: 355, description: "South-Indian style spicy fried chicken chunks tempered with curry leaves, yogurt, and mustard.", isVeg: false },
      { id: "btw-n3", name: "Chicken Spring Roll", price: 355, description: "Deep-fried rolls stuffed with seasoned minced chicken and spring vegetables.", isVeg: false },
      { id: "btw-n4", name: "Chicken Drums", price: 395, description: "French-cut chicken wings shaped as lollipops, fried, and tossed in hot garlic-manchurian sauce.", isVeg: false, isPopular: true },
      { id: "btw-n5", name: "Chilli Chicken Dimsum", price: 395, description: "Juicy chicken dumplings pan-fried or steamed, tossed in hot soy-chilli glaze.", isVeg: false },
      { id: "btw-n6", name: "Chicken Dimsum (Steam/Fried)", price: "355/395", description: "Classic steamed or fried chicken mince dumplings served with spicy tomato-sesame sauce.", isVeg: false },
      { id: "btw-n7", name: "Prawn Salt and Pepper", price: 630, description: "Crispy wok-fried tail-on prawns tossed in sea salt, white pepper, and finely diced spring onions.", isVeg: false, isPopular: true },
      { id: "btw-n8", name: "Chicken Sunrise", price: 395, description: "LBW chef's special starter featuring shredded chicken tossed in a tangy sunset-colored spicy dressing.", isVeg: false }
    ]
  },
  {
    id: "howzatt",
    title: "Howzatt",
    subtitle: "Rich Indian Main Course Curries",
    items: [
      { id: "hz-v1", name: "Malai Kofta", price: 395, description: "Rich cottage cheese and potato dumplings stuffed with nuts, served in a sweet, velvety cashew cream gravy.", isVeg: true, isPopular: true },
      { id: "hz-v2", name: "Gatta Curry", price: 370, description: "Traditional Rajasthani gram-flour dumplings simmered in a spiced tangy yogurt and mustard curry.", isVeg: true },
      { id: "hz-v3", name: "Sabzi Panchmel", price: 395, description: "A colorful dry stir-fry combining five select seasonal vegetables tossed in fresh dry spices.", isVeg: true },
      { id: "hz-v4", name: "Navratna Korma", price: 395, description: "A rich royal curry featuring nine varieties of vegetables, fruits, and nuts in a mild cream base.", isVeg: true },
      { id: "hz-v5", name: "Diwani Handi", price: 385, description: "Seasonal diced vegetables and cottage cheese cooked together in a rich coriander-spinach onion gravy.", isVeg: true },
      { id: "hz-v6", name: "Veg Jalfrezi", price: 375, description: "Stir-fried vegetables and paneer cubes cooked in a tangy tomato sauce with bell peppers.", isVeg: true },
      { id: "hz-v7", name: "Khumb Matar", price: 385, description: "Sliced fresh button mushrooms and sweet green peas simmered in a semi-dry onion-tomato masala.", isVeg: true },
      { id: "hz-v8", name: "Paneer Lababdar", price: 385, description: "Cottage cheese chunks cooked in an onion-tomato gravy with grated paneer and rich cream.", isVeg: true, isPopular: true },
      { id: "hz-v9", name: "Paneer Palak", price: 385, description: "Classic North Indian curry combining paneer cubes with a smooth, spiced spinach puree.", isVeg: true },
      { id: "hz-v10", name: "Paneer Tikka Masala", price: 385, description: "Chargrilled paneer tikka chunks folded into a thick, spiced onion-tomato gravy.", isVeg: true },
      { id: "hz-v11", name: "Paneer Butter Masala", price: 385, description: "A popular rich curry prepared with paneer chunks cooked in a smooth, buttery tomato cream sauce.", isVeg: true, isPopular: true },
      { id: "hz-v12", name: "Bhojpuri Dum Aloo", price: 345, description: "Deep-fried baby potatoes stuffed with paneer and herbs, simmered in a spicy local Bhojpuri style gravy.", isVeg: true },
      { id: "hz-v13", name: "Bhindi Do Pyaza", price: 345, description: "Tender okra cooked with double the amount of sauteed onions, ginger, and raw spices.", isVeg: true },
      { id: "hz-v14", name: "Jeera Aloo", price: 345, description: "Simple comfort dish of boiled potatoes tossed in cumin seeds, green chillies, and fresh coriander.", isVeg: true },
      { id: "hz-v15", name: "Khumb Do Pyaza", price: 385, description: "Button mushrooms stir-fried with lots of cubed onions, tomatoes, and home-ground spices.", isVeg: true },
      
      { id: "hz-n1", name: "Mutton @ LBW", price: 595, description: "Our signature tender goat meat slow-cooked in a sealed clay pot with secret house spices.", isVeg: false, isPopular: true },
      { id: "hz-n2", name: "Mutton Rogan Josh", price: 555, description: "Classic Kashmiri mutton curry slow-cooked with red alkanet root (ratanjot) and Kashmiri red chillies.", isVeg: false, isPopular: true },
      { id: "hz-n3", name: "Rara Mutton", price: 555, description: "A rich combination of tender lamb pieces and spiced lamb mince slow-simmered in cardamom and onions.", isVeg: false },
      { id: "hz-n4", name: "Chicken @ LBW", price: 485, description: "Chef's signature chicken curry, slow-cooked in handi with whole spices, garlic bulb, and rich reduction.", isVeg: false, isPopular: true },
      { id: "hz-n5", name: "Matka Mutton", price: 595, description: "Rustic mutton dish slow-steamed inside a sealed clay pot over slow charcoal embers.", isVeg: false },
      { id: "hz-n6", name: "Chicken Changezi", price: 485, description: "Old Delhi style rich chicken curry prepared with milk, cream, roasted spices, and tomato-onion gravy.", isVeg: false },
      { id: "hz-n7", name: "Chicken Tikka Masala", price: 485, description: "Tandoori chicken tikka pieces cooked in a spiced, creamy orange-colored tomato gravy.", isVeg: false, isPopular: true },
      { id: "hz-n8", name: "Dehati Chicken", price: 485, description: "Authentic rustic bihari style chicken curry cooked with mustard oil, garlic cloves, and simple dry spices.", isVeg: false, isPopular: true },
      { id: "hz-n9", name: "Butter Chicken", price: 485, description: "Shredded tandoori chicken cooked in a rich, velvety tomato paste with lots of butter and cream.", isVeg: false, isPopular: true },
      { id: "hz-n10", name: "Goan Chicken Curry", price: 485, description: "Mild, fragrant coastal curry cooked with ground coconut, tamarind, and green chillies.", isVeg: false },
      { id: "hz-n11", name: "Murgh Kalimirch", price: 485, description: "Creamy chicken curry heavily spiced with coarsely crushed black peppercorns.", isVeg: false },
      { id: "hz-n12", name: "Murgh Do Pyaza", price: 485, description: "Chicken cooked in onion-rich semi-dry gravy with whole spices and diced sauteed onions.", isVeg: false },
      { id: "hz-n13", name: "Bengali Fish Curry", price: 495, description: "River fish steaks cooked in a mustard-paste gravy with mustard oil, green chillies, and wild panch phoron.", isVeg: false },
      { id: "hz-n14", name: "Egg Curry", price: 415, description: "Boiled fried eggs simmered in a spiced homestyle onion and tomato gravy.", isVeg: false },
      { id: "hz-n15", name: "Egg @ LBW", price: 415, description: "Signature spiced egg curry cooked in a handi with chef's secret spice mix.", isVeg: false }
    ]
  },
  {
    id: "doosra",
    title: "Doosra",
    subtitle: "Pan-Asian Main Course Mains",
    items: [
      { id: "ds-v1", name: "Exotic Veg in Hot Garlic / Sweet & Sour / Schezwan", price: 375, description: "Crisp broccoli, bell peppers, baby corn, water chestnuts tossed in your choice of classic Chinese sauce.", isVeg: true },
      { id: "ds-v2", name: "Veg Manchurian (Dry/Gravy)", price: "345/365", description: "Vegetable dumplings fried and simmered in a tangy ginger, garlic, and soy onion sauce.", isVeg: true },
      { id: "ds-v3", name: "Paneer Manchurian (Dry/Gravy)", price: 395, description: "Fried paneer chunks tossed with spring onions and tangy dark manchurian gravy.", isVeg: true },
      { id: "ds-v4", name: "Mushroom Chilli (Dry/Gravy)", price: "395/375", description: "Crispy batter-fried button mushrooms tossed in hot green chillies, garlic, and soy sauce.", isVeg: true },
      { id: "ds-n1", name: "Thai Prawn Curry", price: 685, description: "Jumbo prawns cooked in rich coconut milk based red or green Thai curry paste with herbs.", isVeg: false, isPopular: true },
      { id: "ds-n2", name: "Thai Chicken Curry", price: 485, description: "Tender chicken pieces simmered in aromatic Thai green or red coconut curry with bamboo shoots.", isVeg: false },
      { id: "ds-n3", name: "Garlic Chicken", price: 385, description: "Chicken cubes stir-fried with lots of minced garlic, white pepper, and scallions in a white sauce.", isVeg: false },
      { id: "ds-n4", name: "Lemon Chicken", price: 385, description: "Crispy fried chicken fillets glazed in a tangy, sweet, and sticky lemon honey sauce.", isVeg: false, isPopular: true }
    ]
  },
  {
    id: "googly",
    title: "Googly",
    subtitle: "Wok-Tossed Rice & Noodles",
    items: [
      { id: "gl-1", name: "Hakka Noodles (Veg/Non Veg)", price: "265/295", description: "Classic Chinese street style noodles wok-tossed with crisp julienned vegetables or egg/chicken.", isVeg: true },
      { id: "gl-2", name: "Chilli Garlic Noodles (Veg/Non Veg)", price: "265/295", description: "Spicy noodles stir-fried with dry red chillies, garlic flakes, and soy sauce.", isVeg: true, isPopular: true },
      { id: "gl-3", name: "American Chopsuey (Veg/Non Veg)", price: "285/315", description: "Sweet-sour tangy red sauce with vegetables or chicken, poured over a bed of crispy fried noodles, topped with a fried egg.", isVeg: true },
      { id: "gl-4", name: "Fried Rice (Veg/Egg/Chicken/Mix)", price: "265/280/295/325", description: "Fluffy wok-tossed aromatic basmati rice with finely chopped vegetables, egg shreds, chicken bits, or mixed meat.", isVeg: true }
    ]
  },
  {
    id: "dal",
    title: "Dal",
    subtitle: "Lentils of the Stadium",
    items: [
      { id: "dl-1", name: "Mughlai Yellow Dal", price: 265, description: "Creamy split pigeon peas cooked Mughlai style with ghee, tomatoes, garlic, and fresh herbs.", isVeg: true },
      { id: "dl-2", name: "Yellow Dal Tadka", price: 265, description: "Yellow lentils tempered with fried cumin seeds, dry red chillies, garlic, and hing in ghee.", isVeg: true },
      { id: "dl-3", name: "Dal Makhani", price: 325, description: "Black lentils slow-cooked overnight with cream, butter, tomato puree, and fenugreek.", isVeg: true, isPopular: true }
    ]
  },
  {
    id: "indian-breads",
    title: "Indian Breads",
    subtitle: "Hot Clay-Oven Flatbreads",
    items: [
      { id: "ib-1", name: "Tandoori Roti (Plain/Butter)", price: "35/45", description: "Whole wheat flatbread baked in the clay tandoor oven.", isVeg: true },
      { id: "ib-2", name: "Plain Naan", price: 55, description: "Leavened refined flour flatbread baked in the tandoor.", isVeg: true },
      { id: "ib-3", name: "Butter Naan / Garlic Naan", price: "65/75", description: "Soft tandoori naan brushed with melted butter or loaded with minced garlic and coriander.", isVeg: true, isPopular: true },
      { id: "ib-4", name: "Stuffed Kulcha (Onion/Paneer/Potato/Mix)", price: 85, description: "Leavened bread stuffed with your choice of seasoned filling, baked till crisp.", isVeg: true },
      { id: "ib-5", name: "Lachha Paratha", price: 65, description: "Multi-layered flaky whole wheat flatbread brushed with ghee and baked.", isVeg: true },
      { id: "ib-6", name: "Missi Roti", price: 65, description: "Savory gram flour flatbread kneaded with onions, green chillies, and carom seeds.", isVeg: true }
    ]
  },
  {
    id: "rice",
    title: "Rice & Biryani",
    subtitle: "Basmati Creations & Clay Pot Biryanis",
    items: [
      { id: "rc-1", name: "Plain Basmati Rice", price: 180, description: "Steamed long-grain premium basmati rice.", isVeg: true },
      { id: "rc-2", name: "Muttar Pulao", price: 220, description: "Aromatic basmati rice cooked with sweet green peas and whole spices.", isVeg: true },
      { id: "rc-3", name: "Jeera Pulao", price: 220, description: "Fluffy basmati rice tempered with golden cumin seeds and pure ghee.", isVeg: true },
      { id: "rc-4", name: "Navrattan Pulao", price: 235, description: "Sweet and colorful rice cooked with saffron, mixed vegetables, paneer cubes, and dry fruits.", isVeg: true },
      { id: "rc-5", name: "Veg Biryani", price: 295, description: "Layered basmati rice and vegetables slow-cooked (dum) with saffron, mint, and fried onions.", isVeg: true },
      { id: "rc-6", name: "Murgh Dum Biryani", price: 385, description: "Aromatic basmati rice layered with spiced marinated chicken, cooked on dum in sealed handi.", isVeg: false, isPopular: true },
      { id: "rc-7", name: "Gosht Dum Biryani", price: 435, description: "Tender baby goat pieces layered with premium basmati rice, cardamon, and saffron, slow dum-cooked.", isVeg: false, isPopular: true },
      { id: "rc-8", name: "Murga Matka Biryani", price: 385, description: "Bihari-style spiced chicken biryani cooked and served in an individual earthen clay pot.", isVeg: false }
    ]
  },
  {
    id: "time-out",
    title: "Time Out",
    subtitle: "Continental Snacks & Platters",
    items: [
      { id: "to-v1", name: "French Fries", price: 225, description: "Classic crisp salted golden potato fingers served with tomato ketchup.", isVeg: true },
      { id: "to-v2", name: "Garlic Cheese Toast", price: 295, description: "Sliced baguette topped with garlic butter, mozzarella, and cheddar cheese, baked till bubbling.", isVeg: true, isPopular: true },
      { id: "to-v3", name: "Veg Nuggets", price: 295, description: "Golden crumbed vegetable patties, crisp fried and served with cheese dip.", isVeg: true },
      { id: "to-v4", name: "Cheese Corn Ball", price: 335, description: "Melted cheese and sweet corn mash rolled in crumbs, fried to a crisp exterior.", isVeg: true, isPopular: true },
      { id: "to-v5", name: "Cottage Cheese Finger", price: 355, description: "Battered fingers of cottage cheese deep-fried with Italian herbs, served with mayo.", isVeg: true },
      { id: "to-n1", name: "Spanish Omelette", price: 235, description: "Fluffy egg omelette folded with pan-fried potato slices and diced sweet onions.", isVeg: false },
      { id: "to-n2", name: "Fish n Chips", price: 525, description: "Premium river fish fillet in beer-batter fried till golden, served with french fries and tartar sauce.", isVeg: false, isPopular: true },
      { id: "to-n3", name: "Chicken Nuggets", price: 395, description: "Crumbed chicken mince bites golden fried, served with hot honey-mustard dip.", isVeg: false },
      { id: "to-n4", name: "Hot & Spicy Chicken", price: 425, description: "Spicy crisp-fried chicken strips dusted with hot peri-peri spice blend.", isVeg: false },
      { id: "to-n5", name: "Golden Fried Prawns", price: 645, description: "Jumbo prawns dipped in egg batter, rolled in breadcrumbs, fried till crunchy.", isVeg: false, isPopular: true },
      { id: "to-n6", name: "Prawns Orley", price: 645, description: "Tail-on prawns coated in a light fluffy flour-soda batter and crisp-fried.", isVeg: false }
    ]
  },
  {
    id: "free-hit",
    title: "Free Hit",
    subtitle: "Gourmet Pastas & Lasagnas",
    items: [
      { id: "fh-1", name: "Pasta in White Sauce (Veg/Chicken)", price: "375/475", description: "Penne pasta tossed in a creamy, velvety cheese sauce with garlic, mushrooms, and broccoli.", isVeg: true },
      { id: "fh-2", name: "Pasta in Red Sauce (Veg/Chicken)", price: "375/475", description: "Penne pasta tossed in a tangy, fiery tomato-basil marinara sauce with olives and bell peppers.", isVeg: true, isPopular: true },
      { id: "fh-3", name: "Lasagna (Veg/Chicken)", price: "475/545", description: "Layered flat pasta sheets with seasonal vegetables or minced chicken, bolognese sauce, ricotta, and baked mozzarella.", isVeg: true, isPopular: true }
    ]
  },
  {
    id: "not-out",
    title: "Not Out",
    subtitle: "Decadent Desserts",
    items: [
      { id: "no-1", name: "Moong Dal Halwa", price: 280, description: "Traditional sweet dessert pudding made from split yellow lentils cooked with lots of ghee, milk, and saffron.", isVeg: true, isPopular: true },
      { id: "no-2", name: "Walnut Brownie with Vanilla Ice Cream", price: 295, description: "Warm, fudgy chocolate walnut brownie served with a scoop of cold vanilla bean ice cream and hot fudge sauce.", isVeg: true, isPopular: true },
      { id: "no-3", name: "Choice Of Ice Cream", price: 165, description: "A scoop of premium chocolate, vanilla, strawberry, or butterscotch ice cream.", isVeg: true },
      { id: "no-4", name: "Gulab Jamun (2pcs)", price: 110, description: "Golden milk-solid dumplings soaked in a warm, sweet saffron and cardamom sugar syrup.", isVeg: true },
      { id: "no-5", name: "Gulab Jamun with Ice Cream (2pcs)", price: 175, description: "Warm sweet gulab jamun served alongside a scoop of vanilla ice cream for the perfect contrast.", isVeg: true, isPopular: true }
    ]
  }
];
