# [ERC] (https://zhnzhn.github.io)
ERC is a economic RESTful client.
With it you can view economic free open data from WEB.  
Data providers: [Quandl](https://www.quandl.com), [Eurostat](http://ec.europa.eu/eurostat/web/main/home)   

![alt text](screenshots/currency.png?raw=true "Currency History")

**1.** **Choose a data source Browser from the header bar.**  
**2.** **Choose a dataset menu item in a Browser.**   
**3.** **Select params and enter query date in a dragable Dialog.**   
**4.** **Click a button Load.**   
**5.** **Also you can export chart to png, jpg, svg, print to pdf.**  
The result will be shown in a Chart in a Chart container.  

After clicking a button Show in a Dialog will be opened Chart container with Charts or empty.   
After closing a Chart container all Charts remains. In one time max three Dalogs can be opened.

In that case of loading data from [Quandl](https://www.quandl.com) data provider,   
for access without Api Key exists some restriction on frequency and amount queries (50 calls per day).

A Quandl Api Key, for using with ERC, can be set in dialog Settings/User Settings.  
Settings saves in browser's memory only for current WEB session.  
Premium Free Sample Data can be requested only with Quandl Api Key.

For loading data from [Eurostat](http://ec.europa.eu/eurostat/web/main/home) data provider does not exist any restriction.  

### Attention
For one item from Dialog can be only one Chart in a container. 
If you want change query parameters for it, close the chart in the container and load data again.
The value of currency is not always USD as shows in a chart tooltip.
Sometimes more details about data can be look at tab Info on a Chart.

## License
This project is licensed under [BSD 3-Clause License](http://opensource.org/licenses/BSD-3-Clause). Copyright (c) 2016, Yevhenii Molodyi.





