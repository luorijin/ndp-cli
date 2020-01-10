import eventBus from './eventBus'
import ls from './localStorage'
import extend from './extend'
class ServletContext{
    constructor(){

    }
}
ServletContext.prototype = new eventBus();
let servletContext = new ServletContext();
extend(servletContext,ls,ENV);
export default servletContext;