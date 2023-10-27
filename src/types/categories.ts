export enum Category {
    Footwear,
    ApparelAndAccessories,
    Automotive,
    ElectronicsAndAppliances,
    Animals,
    OfficeAndAdvertising,
    SportTourismAndHobby,
    Construction,
    Grocery,
    Industry,
    HealthAndBeauty,
    Children,
    HomeAndLiving,
    GardenAndAgriculture,
    Erotica,
    Gadgets,
    Art,
    Entertainment,
    ComputersAndElectronics,
}

enum FootwearSub {
    Sneakers,
    Boots,
    Sandals,
    FormalShoes,
    Slippers,
}

enum ApparelAndAccessoriesSub {
    Clothing,
    Jewelry,
    Watches,
    Hats,
    Scarves,
}

enum AutomotiveSub {
    Cars,
    Motorcycles,
    SpareParts,
    CarCare,
    ToolsAndEquipment,
}

enum ElectronicsAndAppliancesSub {
    HomeAppliances,
    AudioAndSound,
    KitchenAppliances,
    PersonalCareAppliances,
    Cameras,
}

enum AnimalsSub {
    Pets,
    FarmAnimals,
    PetFood,
    PetToys,
    PetCare,
}

enum OfficeAndAdvertisingSub {
    Stationery,
    OfficeFurniture,
    PrintingServices,
    PromotionalMaterials,
    OfficeElectronics,
}

enum SportTourismAndHobbySub {
    SportingGoods,
    TravelGear,
    MusicalInstruments,
    ArtAndCraft,
    OutdoorRecreation,
}

enum ConstructionSub {
    BuildingMaterials,
    Tools,
    HeavyMachinery,
    SafetyEquipment,
    Fixtures,
}

enum GrocerySub {
    FruitsAndVegetables,
    MeatAndPoultry,
    DairyProducts,
    Beverages,
    Snacks,
}

enum IndustrySub {
    Machinery,
    RawMaterials,
    IndustrialTools,
    SafetyGear,
    ManufacturingEquipment,
}

enum HealthAndBeautySub {
    Skincare,
    Makeup,
    Haircare,
    PerfumesAndFragrances,
    WellnessProducts,
}

enum ChildrenSub {
    Toys,
    BabyCare,
    ChildrenClothing,
    EducationalMaterials,
    KidsFurniture,
}

enum HomeAndLivingSub {
    Furniture,
    HomeDecor,
    Bedding,
    Kitchenware,
    Lighting,
}

enum GardenAndAgricultureSub {
    Plants,
    GardeningTools,
    Seeds,
    Fertilizers,
    Pesticides,
}

enum EroticaSub {
    Lingerie,
    AdultToys,
    Literature,
    DVDs,
    Accessories,
}

enum GadgetsSub {
    Smartwatches,
    Drones,
    VRHeadsets,
    Wearables,
    AudioGadgets,
}

enum ArtSub {
    Paintings,
    Sculptures,
    Photography,
    Installations,
    ArtSupplies,
}

enum EntertainmentSub {
    MoviesAndSeries,
    Music,
    Books,
    BoardGames,
    ConcertAndEventTickets,
}

enum ComputersAndElectronicsSub {
    Laptops,
    Desktops,
    ComputerAccessories,
    StorageDevices,
    Networking,
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
