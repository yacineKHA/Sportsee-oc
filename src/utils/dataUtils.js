export const getMinValue = (data, key) => {
    return Math.min(...data.map(item => item[key]));
};

export const getMaxValue = (data, key) => {
    return Math.max(...data.map(item => item[key]));
};

export const daysToWeekdays = (data) => {
    const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

    return data.map((item, index) => ({
        ...item,
        day: daysOfWeek[index]
    }));
};

