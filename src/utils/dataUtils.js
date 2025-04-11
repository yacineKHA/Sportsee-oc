export const daysToWeekdays = (data) => {
    const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

    return data.map((item, index) => ({
        ...item,
        day: daysOfWeek[index]
    }));
};

