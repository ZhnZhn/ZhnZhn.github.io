# [ERC (Economic RESTful Client)](https://zhnzhn.github.io)
ERC (Economic RESTful Client) is a web app that gives the ability to explore, visualize and compose economic and financial data mostly to charts from open and private data providers. Some examples of data visualization and news about web app ERC can be found on Twitter's page [@webapperc](https://twitter.com/webapperc).   

Data providers: [DBnomics](https://db.nomics.world), [Eurostat](http://ec.europa.eu/eurostat/web/main/home), [UnComtrade](https://comtrade.un.org), [FAOSTAT](http://www.fao.org/faostat/en/#data/), [World Bank](https://data.worldbank.org/), [Statistics Norway](http://www.ssb.no/en), [Statistics Sweden](https://www.scb.se/en), [Insee: France Statistics](https://www.insee.fr/en/accueil), [Nasdaq Data Link (formerly Quandl)](https://data.nasdaq.com), [Alpha Vantage](https://www.alphavantage.co) and more (All 47).   

![alt text](screencast/erc-currency-example.png?raw=true "Currency History")

**1.** **Please, choose a topic data source Browser from the header bar.**  
**2.** **Next, choose a dataset menu item in the opended up Browser.**   
**3.** **Select params and enter query date in the opened up draggable Dialog.**   
**4.** **Click a button Load.**   

**The result will be visualized in a chart in a resizable Chart container.**  
**Also it is posible to export the chart to PNG, JPG, SVG, print to PDF.**  

After clicking a **button Show** in a **Dialog** will be an opened up **Chart container** with charts or empty.   
After closing a **Chart container** all charts remains. In one time max three **Dialogs** can be opened.

Some open and private data providers require user's API Key.   

For example, for loading data from Nasdaq Data Link without API Key exists some restriction on frequency and amount of queries (50 per day/1 at a time) and can be deprecated, according to Nasdaq Data Link.
With API Key it is possible to make (50 000 per day/1 at a time). It's free of charge to receive.  

Data providers API Keys can be set on the **tab ApiKeys, dialog Settings**. For loading data from data providers without CORS required local HTTP proxy server, could be set in the **dialog Settings**.  

There is three UI theme in the web app ERC: **Dark**, **Light**, and **Sand** can be set on **tab Options, dialog Settings**. All user's settings keep in browser's memory only for a current web session.  

More details and requirements about data providers can be found in the [web app ERC](https://zhnzhn.github.io) **pane About** and provider's websites. More information about data can be found on a **tab Info of Chart item**.  

### Attention
For one item from **Dialog** can be only one **Chart item** in a container.

## License
This project is licensed under [BSD 3-Clause License](http://opensource.org/licenses/BSD-3-Clause). Copyright (c) 2016-present, Yevhenii Molodyi.
