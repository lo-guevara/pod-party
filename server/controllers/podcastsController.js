/**
 * ************************************
 *
 * @module podcastsController.js
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Contains middleware that handle user podcasts 
 *
 * ************************************
 */
const db = require('../models/models');
const podcastsController = {};
  
// GET ALL podcastS
podcastsController.getPodcasts = (req, res, next) => {
   
  const podcastQuery = 'SELECT * FROM "public"."podcasts" LIMIT 100';
   
  db.query(podcastQuery)
    .then((data) => {
      res.locals.podcasts = data.rows;
      return next();
    })
    .catch((err) => next({
      log:`error in get podcasts controller: ${err}`,
      message: {err: 'error occured in get podcasts controller'}
    }));
};
 
// POST A podcast
podcastsController.addPodcast = (req, res, next) => {
  const {podcast_name, author, group_id, created_at} = req.body;
     
  const podcastPost = `INSERT INTO podcasts (podcast_name, author, group_id, created_at)
   VALUES ($1, $2, $3, $4);`;
 
  const params = [podcast_name, author, group_id, created_at];
 
  db.query(podcastPost, params)
    .then((data) => {
      res.locals.podcast = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post podcasts controller: ${err}`,
      message: {err: 'error occured in post podcasts controller'}
    }));
};
 
//  DELETE A podcast
podcastsController.deletePodcast = (req, res, next) => {
  const {podcast_name} = req.body;
     
  const podcastDelete = `DELETE FROM podcasts
   WHERE podcast_name = $1;`;
 
  const params = [podcast_name];
 
  db.query(podcastDelete, params)
    .then((data) => {
      console.log('successfully deleted podcast');
      return next();
    })
    .catch((err) => next({
      log:`error in post podcasts controller: ${err}`,
      message: {err: 'error occured in post podcasts controller'}
    }));
};
 
 
module.exports = podcastsController;