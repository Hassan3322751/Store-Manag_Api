const paginate = async (Model, query = '', pageNo = 0, pageLimit = 9, sortBy, filter) => {
    const queryFilter = query != 'null' && query != null ? (
        {title: {$regex: query, $options: 'i'}}
    ) : ({});

    const finalFilter = {...queryFilter, ...filter}

    const skip = pageNo * pageLimit;
    let results, count;

        try {
            if (!sortBy) {
            results = await Model.find(finalFilter).limit(pageLimit).skip(skip).exec();
            count = await Model.countDocuments(finalFilter).exec();
        } else {
            results = await Model.find(finalFilter).limit(pageLimit).skip(skip).sort(sortBy).exec();  //Initial
            count = await Model.countDocuments(finalFilter).exec();

        }

        return { results, count };
    } catch (error) {
        console.error("Error in pagination:", error);
        throw error; // Re-throw the error to be handled by the caller
    }

};

module.exports = paginate