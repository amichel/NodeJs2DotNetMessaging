using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Win32.SafeHandles;
using NetMQ;
using NetMQ.Sockets;

namespace DotNetConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var socket = new RouterSocket())
            {
                socket.Bind("tcp://127.0.0.1:5560");
                while (true)
                {
                    string data;
                    bool more;
                    if (socket.TryReceiveFrameString(TimeSpan.FromSeconds(5), Encoding.UTF8, out data, out more))
                        if (!more) Console.WriteLine(data);
                }
            }
        }
    }
}
