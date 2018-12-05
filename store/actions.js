/**
 * Created by huangxiaoyan on 2018/11/29.
 */
import request from '~/service'

export const banner = async (store, params) => {
  return await request.get('/api/dbapi.php', params)
}
