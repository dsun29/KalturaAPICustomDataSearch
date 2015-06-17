var kaltura = require('./KalturaClient.js');
var kalturaTypes = require('./KalturaTypes.js');
var vo = require('./KalturaVO.js')


var partnerId = 12345678; //user partner Id
var conf = new kaltura.KalturaConfiguration(partnerId);
conf.serviceUrl = "http://www.kaltura.com";

var client = new kaltura.KalturaClient(conf);


var secret = "youadminsecret";
var userId = "youruserid";
var type = kalturaTypes.KalturaSessionType.ADMIN;

var expiry = 100000;
var privileges = null;


var cb = function (results){
    if(results){
        client.setKs(results );
        console.log(results);
        
        var filter = new vo.KalturaMediaEntryFilter();
        
        
        var filterAdvancedSearch = new vo.KalturaMetadataSearchItem();
        filterAdvancedSearch.type = 2; //kaltura.KalturaSearchOperatorType.SEARCH_OR;
        filterAdvancedSearch.metadataProfileId = 555555; //Profile Id -- also called scheme Id
        
        var filterAdvancedSearchItems = new vo.KalturaSearchCondition();
        filterAdvancedSearchItems.field = "/*[local-name()='metadata']/*[local-name()='System name of the custom field']"; 
        filterAdvancedSearchItems.value = 'targeted value';
        
        filterAdvancedSearch.items = [filterAdvancedSearchItems];
        filter.advancedSearch = filterAdvancedSearch;
        
        
        client.media.listAction(function(results){console.log(results);
                                }, filter, null);
        
        return;
    }
}

client.session.start(cb, secret, userId, type, partnerId, expiry, privileges);


