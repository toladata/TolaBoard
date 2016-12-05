/* Initializer that runs for every ajax request within app */
export function initialize(application) {
  Ember.$.ajaxPrefilter(function(options, originalOptions, jqXHR) {

    var token = Cookies.get('appToken');
    
    if(token){
      jqXHR.setRequestHeader('xhrFields', { withCredentials: true });
      jqXHR.setRequestHeader('Authorization', token);
    } else {
    	console.log('no token in ajax-prefilter')
      // console.log(application)
    }
  });
}

export default {
  name: 'ajax-prefilter',
  initialize: initialize
};