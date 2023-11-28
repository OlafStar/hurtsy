const translations: {[key: string]: string} = {
    // Category translations
    footwear: 'Obuwie',
    apparelAndAccessories: 'Odzież i Dodatki',
    automotive: 'Motoryzacja',
    electronicsAndAppliances: 'Elektronika i AGD',
    animals: 'Zwierzęta',
    officeAndAdvertising: 'Biuro i Reklama',
    sportTourismAndHobby: 'Sport, Turystyka i Hobby',
    construction: 'Budownictwo',
    grocery: 'Spożywcze',
    industry: 'Przemysł',
    healthAndBeauty: 'Zdrowie i Uroda',
    children: 'Dzieci',
    homeAndLiving: 'Dom i Mieszkanie',
    gardenAndAgriculture: 'Ogród i Rolnictwo',
    erotica: 'Erotyka',
    gadgets: 'Gadżety',
    art: 'Sztuka',
    entertainment: 'Rozrywka',
    computersAndElectronics: 'Komputery i Elektronika',

    // FootwearSub translations
    sneakers: 'Trampki/Sneakersy',
    boots: 'Buty',
    sandals: 'Sandały',
    formalShoes: 'Buty eleganckie',
    slippers: 'Kapcie',

    // ApparelAndAccessoriesSub translations
    clothing: 'Ubrania',
    jewelry: 'Biżuteria',
    watches: 'Zegarki',
    hats: 'Kapelusze',
    scarves: 'Szaliki',

    // AutomotiveSub translations
    cars: 'Samochody',
    motorcycles: 'Motocykle',
    spareParts: 'Części zamienne',
    carCare: 'Pielęgnacja samochodu',
    toolsAndEquipment: 'Narzędzia i Wyposażenie',

    // ElectronicsAndAppliancesSub translations
    homeAppliances: 'AGD',
    audioAndSound: 'Audio i Dźwięk',
    kitchenAppliances: 'AGD kuchenne',
    personalCareAppliances: 'Urządzenia do pielęgnacji',
    cameras: 'Aparaty',

    // AnimalsSub translations
    pets: 'Zwierzęta domowe',
    farmAnimals: 'Zwierzęta gospodarskie',
    petFood: 'Pokarm dla zwierząt',
    petToys: 'Zabawki dla zwierząt',
    petCare: 'Pielęgnacja zwierząt',

    // OfficeAndAdvertisingSub translations
    stationery: 'Artykuły papiernicze',
    officeFurniture: 'Meble biurowe',
    printingServices: 'Usługi drukarskie',
    promotionalMaterials: 'Materiały promocyjne',
    officeElectronics: 'Elektronika biurowa',

    // SportTourismAndHobbySub translations
    sportingGoods: 'Sprzęt sportowy',
    travelGear: 'Wyposażenie podróżne',
    musicalInstruments: 'Instrumenty muzyczne',
    artAndCraft: 'Sztuka i rękodzieło',
    outdoorRecreation: 'Rekreacja na świeżym powietrzu',

    // ConstructionSub translations
    buildingMaterials: 'Materiały budowlane',
    tools: 'Narzędzia',
    heavyMachinery: 'Ciężki sprzęt',
    safetyEquipment: 'Wyposażenie BHP',
    fixtures: 'Armatura',

    // GrocerySub translations
    fruitsAndVegetables: 'Owoce i warzywa',
    meatAndPoultry: 'Mięso i drób',
    dairyProducts: 'Produkty mleczne',
    beverages: 'Napoje',
    snacks: 'Przekąski',

    // IndustrySub translations
    machinery: 'Maszyny',
    rawMaterials: 'Surowce',
    industrialTools: 'Narzędzia przemysłowe',
    safetyGear: 'Wyposażenie ochronne',
    manufacturingEquipment: 'Sprzęt produkcyjny',

    // HealthAndBeautySub translations
    skincare: 'Pielęgnacja skóry',
    makeup: 'Makijaż',
    haircare: 'Pielęgnacja włosów',
    perfumesAndFragrances: 'Perfumy i zapachy',
    wellnessProducts: 'Produkty wellness',

    // ChildrenSub translations
    toys: 'Zabawki',
    babyCare: 'Opieka nad dzieckiem',
    childrenClothing: 'Ubrania dla dzieci',
    educationalMaterials: 'Materiały edukacyjne',
    kidsFurniture: 'Meble dla dzieci',

    // HomeAndLivingSub translations
    furniture: 'Meble',
    homeDecor: 'Dekoracje domu',
    bedding: 'Pościel',
    kitchenware: 'Akcesoria kuchenne',
    lighting: 'Oświetlenie',

    // GardenAndAgricultureSub translations
    plants: 'Rośliny',
    gardeningTools: 'Narzędzia ogrodnicze',
    seeds: 'Nasiona',
    fertilizers: 'Nawozy',
    pesticides: 'Środki ochrony roślin',

    // EroticaSub translations
    lingerie: 'Bielizna',
    adultToys: 'Zabawki dla dorosłych',
    literature: 'Literatura',
    dvds: 'DVD',
    accessories: 'Akcesoria',

    // GadgetsSub translations
    smartwatches: 'Smartwatche',
    drones: 'Drony',
    vrHeadsets: 'Zestawy VR',
    wearables: 'Urządzenia wearable',
    audioGadgets: 'Gadżety audio',

    // ArtSub translations
    paintings: 'Obrazy',
    sculptures: 'Rzeźby',
    photography: 'Fotografia',
    installations: 'Instalacje',
    artSupplies: 'Materiały plastyczne',

    // EntertainmentSub translations
    moviesAndSeries: 'Filmy i seriale',
    music: 'Muzyka',
    books: 'Książki',
    boardGames: 'Gry planszowe',
    concertAndEventTickets: 'Bilety na koncerty i wydarzenia',

    // ComputersAndElectronicsSub translations
    laptops: 'Laptopy',
    desktops: 'Komputery stacjonarne',
    computerAccessories: 'Akcesoria komputerowe',
    storageDevices: 'Urządzenia do przechowywania danych',
    networking: 'Sieci komputerowe',

    products: 'Produkty',
    companies: 'Firmy',

    prices: 'Ceny',
    price: 'Cena',
    minQuantity: 'Min. Ilość',
    maxQuantity: 'Max. Ilość',

    customizations: 'Personalizacja',
    name: 'Nazwa',

    customProperties: 'Kluczowe atrybuty',
    value: 'Wartość',

    poland: 'Polska',

    mainImage: 'Zdjęcie',
    category: 'Kategorie',
    deliveryPrice: 'Cena dostawy',
    promotedTo: 'Promowane',
};

//TODO CHANGE TO LOCALES
export function translateEnumValueToPolish(value: string): string {
    return translations[value] || 'Nieznana wartość';
}
