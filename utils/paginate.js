const paginate = async (Model, query = '', pageNo = 0, pageLimit = 9, sortBy) => {
    const findFilter = query != 'null' ? {title: {$regex: query, $options: 'i'}} : {};
    const skip = pageNo * pageLimit;
    let results, count;

    try {
        if (!sortBy) {
            results = await Model.find(findFilter).limit(pageLimit).skip(skip).exec();
            count = await Model.countDocuments(findFilter).exec();
        } else {
            results = await Model.find(findFilter).limit(pageLimit).skip(skip).sort(sortBy).exec();
            count = await Model.countDocuments(findFilter).exec();
        }

        return { results, count };
    } catch (error) {
        console.error("Error in pagination:", error);
        throw error; // Re-throw the error to be handled by the caller
    }

};

module.exports = paginate