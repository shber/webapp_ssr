/*
 * @Author: Shber
 * @Date: 2022-11-02 20:48:01
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-02 20:58:54
 * @Description: 
 */
export default ()=>{
  return {
    confing(config, env){
      console.log('ViteEnv', config, env);
      return {}
    }
  }
}