import Query from '../QuerySchema.js';

class QueryService {
  async create(query) {
    try {
      const createdQuery = await Query.create(query);
      return createdQuery;
    } catch (error) {
      console.log(error.message);
    }
  }
  // Fix:
  async getOne(id) {
    if (!id) {
      throw new Error('ID are not used');
    }
    const query = await Query.findById(id);
    return query;
  }

  async getAll() {
    try {
      const queries = await Query.find();
      return queries;
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(query) {
    if (!query._id) {
      throw new Error('ID are not used');
    }
    const updateQuery = await Query.findByIdAndUpdate(query._id, query, { new: true });
    return updateQuery;
  }

  async delete(id) {
    if (!id) {
      throw new Error('ID are not used');
    }
    const query = await Query.findByIdAndDelete(id);
    return query;
  }
  async deleteMany(boolean) {
    try {
      const queries = await Query.deleteMany({});
      return queries;
    } catch (error) {
      console.log(error.message);
    }
    if (boolean) {
    }
  }
}
export default new QueryService();
