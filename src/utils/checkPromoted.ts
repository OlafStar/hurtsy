export const isPromotionActive = (promotedDate: Date | null | undefined) => {
    if (!promotedDate) return false;
    const currentDate = new Date();
    const promotionDate = new Date(promotedDate);
    return promotionDate > currentDate;
};
