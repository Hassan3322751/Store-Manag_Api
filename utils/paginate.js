const paginate = async (Model, query = '', pageNo = 0, pageLimit = 9, sortBy, filter) => {
    // console.log(filter)

    const queryFilter = query != 'null' && query != null ? (
        {title: {$regex: query, $options: 'i'}}
    ) : ({});

    const finalFilter = {...queryFilter, ...filter}

    const skip = pageNo * pageLimit;
    let results, count;
    console.log(finalFilter, sortBy )

        try {
            if (!sortBy) {
            console.log('1 first ')
            results = await Model.find(finalFilter).limit(pageLimit).skip(skip).exec();
            count = await Model.countDocuments(finalFilter).exec();
            console.log(count)
        } else {
            console.log('2 second condition ')
            results = await Model.find(finalFilter).limit(pageLimit).skip(skip).sort(sortBy).exec();  //Initial
            // results = await Model.find({ $or: [{ favourite: true}, { title: {$regex: query, $options: 'i'} }] }).limit(pageLimit).skip(skip).sort(sortBy).exec();
            count = await Model.countDocuments(finalFilter).exec();
            // console.log(count)
        }

        return { results, count };
    } catch (error) {
        console.error("Error in pagination:", error);
        throw error; // Re-throw the error to be handled by the caller
    }

};

module.exports = paginate