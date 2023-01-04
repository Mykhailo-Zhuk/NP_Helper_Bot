import QueryService from '../QueryService/QueryService.js';

class QueryController {
  async create(req, res) {
    try {
      const query = await QueryService.create(req.body);
      res.json(query);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async getOne(req, res) {
    try {
      const query = await QueryService.getOne(req.params.id);
      return res.json(query);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const queries = await QueryService.getAll();
      return res.json(queries);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async update(req, res) {
    try {
      const updatedQuery = await QueryService.update(req.body);
      return res.json(updatedQuery);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async delete(req, res) {
    try {
      const query = await QueryService.delete(req.params.id);
      return res.json(query);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async deleteMany(req, res) {
    try {
      const queries = await QueryService.deleteMany(req.body);
      return res.json(queries);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new QueryController();
