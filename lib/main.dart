import 'package:flutter/material.dart';

void main(){
  runApp(MaterialApp(
    title:"People count",
    home: Home()
  ));
}

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {

  int _people = 0;

  void changePeople(int value){

    setState(() {
       _people += value;
    });

  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Image.asset(
          "images/dark.jpg",
          fit: BoxFit.cover,
        ),
        Column(
          mainAxisAlignment: MainAxisAlignment.center ,
          children: <Widget>[
            Text("Pessoas : $_people " , style: TextStyle(color: Colors.white , fontWeight: FontWeight.bold ,)),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.all(10.0),
                  child:  FlatButton(
                    onPressed: (){
                     changePeople(1);
                    },
                    child: Text("+1" , style: TextStyle(fontSize: 40.0 , fontWeight: FontWeight.bold , color: Colors.white)),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.all(10.0),
                  child:  FlatButton(
                    onPressed: (){
                      changePeople(-1);
                    },
                    child: Text("-1" , style: TextStyle(fontSize: 40.0 , fontWeight: FontWeight.bold , color: Colors.white)),
                  ),
                ),

              ],
            ),
            Text("Pode entrar!!", style: TextStyle(color: Colors.white , fontStyle: FontStyle.italic , fontSize: 30.0)),
          ],
        )

      ],
    );
  }
}