import java.io.*;
import java.net.*;
public class talkclient{
  public static void main(String args[]){

    socket c = null;
    DataInputStream usr=inpnull; 
    DataInputStream.din=new DataInputStream(System.in);
    DataOutputStream dout = null;
    try{
     c=new socket("127.0.0.1",1234);
     usr_inp=new DataInputStream(c.getInputStream());
     dout = new DataOutputStream(c.getOutputStream());
     }
catch(IO Exception e){}
  if(c!=null )