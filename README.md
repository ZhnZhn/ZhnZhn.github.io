# ERC
ERC is a economic RESTFul client.
With it you can view economic free open data from WEB.

**1.** Choose a data source from the header bar.  
**2.** Choose a dataset menu item in a Browser.  
**3.** Select a data item and enter query date in a dragable Dialog.  
**4.** Click a button Load.  
The result will be shown in a Chart in a Chart container.  

After clicking a button Show in a Dialog will be opened Chart container with Charts or empty.   
After closing a Chart container all Charts remains.In one time max three Dalogs can be opened.

**Attention:** For one item from Dialog can be only one Chart in a container. 
If you want change query parameters for it, close the chart in the container and load data again.
The value of currency is not always USD as shows in a chart tooltip. 
Sometimes more details about data can be look at tab Info on a Chart.

In that case all data load from [Quandl](https://www.quandl.com) REST services. 
For free access exist some restriction on frequency and amount queries (50 calls per day).
