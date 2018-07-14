import axios from 'axios';
import debugFactory from 'debug';
import {apiURL} from '../constants/ott';
import {PlatformFlagLabel, Query, Response} from './ott.typings';

const debug = debugFactory('viuer:api:ott');

const ott = axios.create({
  baseURL: apiURL,
  headers: {'Accept-Encoding': 'gzip, deflate, br'}
});

/**
 * Request OTT Index API
 *
 * @public
 * @param {Query} query
 * @returns {Promise<Response>}
 */
export const getIndex = (query: Query): Promise<Response> => {
  const url = 'index.php';
  const params = getQuery(query);
  const config = {params};
  debug('fetching', url, config);
  return ott.get(url, config)
    .then(res => res.data);
};

/**
 * Get the query object with default query options
 *
 * @private
 * @param {Query} query The query object
 * @returns {Query}
 */
function getQuery (query: Query): Query {
  const defaults = {
    platform_flag_label: PlatformFlagLabel.Web,
    area_id: 1
  };
  return {
    ...defaults,
    ...query
  };
}

export default ott;