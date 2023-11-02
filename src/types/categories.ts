export enum Category {
    Footwear = 'footwear',
    ApparelAndAccessories = 'apparelAndAccessories',
    Automotive = 'automotive',
    ElectronicsAndAppliances = 'electronicsAndAppliances',
    Animals = 'animals',
    OfficeAndAdvertising = 'officeAndAdvertising',
    SportTourismAndHobby = 'sportTourismAndHobby',
    Construction = 'construction',
    Grocery = 'grocery',
    Industry = 'industry',
    HealthAndBeauty = 'healthAndBeauty',
    Children = 'children',
    HomeAndLiving = 'homeAndLiving',
    GardenAndAgriculture = 'gardenAndAgriculture',
    Erotica = 'erotica',
    Gadgets = 'gadgets',
    Art = 'art',
    Entertainment = 'entertainment',
    ComputersAndElectronics = 'computersAndElectronics',
}

enum FootwearSub {
    Sneakers = 'sneakers',
    Boots = 'boots',
    Sandals = 'sandals',
    FormalShoes = 'formalShoes',
    Slippers = 'slippers',
}

enum ApparelAndAccessoriesSub {
    Clothing = 'clothing',
    Jewelry = 'jewelry',
    Watches = 'watches',
    Hats = 'hats',
    Scarves = 'scarves',
}

enum AutomotiveSub {
    Cars = 'cars',
    Motorcycles = 'motorcycles',
    SpareParts = 'spareParts',
    CarCare = 'carCare',
    ToolsAndEquipment = 'toolsAndEquipment',
}

enum ElectronicsAndAppliancesSub {
    HomeAppliances = 'homeAppliances',
    AudioAndSound = 'audioAndSound',
    KitchenAppliances = 'kitchenAppliances',
    PersonalCareAppliances = 'personalCareAppliances',
    Cameras = 'cameras',
}

enum AnimalsSub {
    Pets = 'pets',
    FarmAnimals = 'farmAnimals',
    PetFood = 'petFood',
    PetToys = 'petToys',
    PetCare = 'petCare',
}

enum OfficeAndAdvertisingSub {
    Stationery = 'stationery',
    OfficeFurniture = 'officeFurniture',
    PrintingServices = 'printingServices',
    PromotionalMaterials = 'promotionalMaterials',
    OfficeElectronics = 'officeElectronics',
}

enum SportTourismAndHobbySub {
    SportingGoods = 'sportingGoods',
    TravelGear = 'travelGear',
    MusicalInstruments = 'musicalInstruments',
    ArtAndCraft = 'artAndCraft',
    OutdoorRecreation = 'outdoorRecreation',
}

enum ConstructionSub {
    BuildingMaterials = 'buildingMaterials',
    Tools = 'tools',
    HeavyMachinery = 'heavyMachinery',
    SafetyEquipment = 'safetyEquipment',
    Fixtures = 'fixtures',
}

enum GrocerySub {
    FruitsAndVegetables = 'fruitsAndVegetables',
    MeatAndPoultry = 'meatAndPoultry',
    DairyProducts = 'dairyProducts',
    Beverages = 'beverages',
    Snacks = 'snacks',
}

enum IndustrySub {
    Machinery = 'machinery',
    RawMaterials = 'rawMaterials',
    IndustrialTools = 'industrialTools',
    SafetyGear = 'safetyGear',
    ManufacturingEquipment = 'manufacturingEquipment',
}

enum HealthAndBeautySub {
    Skincare = 'skincare',
    Makeup = 'makeup',
    Haircare = 'haircare',
    PerfumesAndFragrances = 'perfumesAndFragrances',
    WellnessProducts = 'wellnessProducts',
}

enum ChildrenSub {
    Toys = 'toys',
    BabyCare = 'babyCare',
    ChildrenClothing = 'childrenClothing',
    EducationalMaterials = 'educationalMaterials',
    KidsFurniture = 'kidsFurniture',
}

enum HomeAndLivingSub {
    Furniture = 'furniture',
    HomeDecor = 'homeDecor',
    Bedding = 'bedding',
    Kitchenware = 'kitchenware',
    Lighting = 'lighting',
}

enum GardenAndAgricultureSub {
    Plants = 'plants',
    GardeningTools = 'gardeningTools',
    Seeds = 'seeds',
    Fertilizers = 'fertilizers',
    Pesticides = 'pesticides',
}

enum EroticaSub {
    Lingerie = 'lingerie',
    AdultToys = 'adultToys',
    Literature = 'literature',
    DVDs = 'dvds',
    Accessories = 'accessories',
}

enum GadgetsSub {
    Smartwatches = 'smartwatches',
    Drones = 'drones',
    VRHeadsets = 'vrHeadsets',
    Wearables = 'wearables',
    AudioGadgets = 'audioGadgets',
}

enum ArtSub {
    Paintings = 'paintings',
    Sculptures = 'sculptures',
    Photography = 'photography',
    Installations = 'installations',
    ArtSupplies = 'artSupplies',
}

enum EntertainmentSub {
    MoviesAndSeries = 'moviesAndSeries',
    Music = 'music',
    Books = 'books',
    BoardGames = 'boardGames',
    ConcertAndEventTickets = 'concertAndEventTickets',
}

enum ComputersAndElectronicsSub {
    Laptops = 'laptops',
    Desktops = 'desktops',
    ComputerAccessories = 'computerAccessories',
    StorageDevices = 'storageDevices',
    Networking = 'networking',
}

type SubCategoryEnum = {
    [key: string]:
        | typeof FootwearSub
        | typeof ApparelAndAccessoriesSub
        | typeof AutomotiveSub
        | typeof ElectronicsAndAppliancesSub
        | typeof AnimalsSub
        | typeof OfficeAndAdvertisingSub
        | typeof SportTourismAndHobbySub
        | typeof ConstructionSub
        | typeof GrocerySub
        | typeof IndustrySub
        | typeof HealthAndBeautySub
        | typeof ChildrenSub
        | typeof HomeAndLivingSub
        | typeof GardenAndAgricultureSub
        | typeof EroticaSub
        | typeof GadgetsSub
        | typeof ArtSub
        | typeof EntertainmentSub
        | typeof ComputersAndElectronicsSub;
};

export const subCategoryEnums: SubCategoryEnum = {
    Footwear: FootwearSub,
    ApparelAndAccessories: ApparelAndAccessoriesSub,
    Automotive: AutomotiveSub,
    ElectronicsAndAppliances: ElectronicsAndAppliancesSub,
    Animals: AnimalsSub,
    OfficeAndAdvertising: OfficeAndAdvertisingSub,
    SportTourismAndHobby: SportTourismAndHobbySub,
    Construction: ConstructionSub,
    Grocery: GrocerySub,
    Industry: IndustrySub,
    HealthAndBeauty: HealthAndBeautySub,
    Children: ChildrenSub,
    HomeAndLiving: HomeAndLivingSub,
    GardenAndAgriculture: GardenAndAgricultureSub,
    Erotica: EroticaSub,
    Gadgets: GadgetsSub,
    Art: ArtSub,
    Entertainment: EntertainmentSub,
    ComputersAndElectronics: ComputersAndElectronicsSub,
};
