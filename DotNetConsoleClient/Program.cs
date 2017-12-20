using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using NetMQ;
using NetMQ.Sockets;

namespace DotNetConsoleClient
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var socket = new DealerSocket())
            {
                socket.Connect("tcp://127.0.0.1:5560");

                for (int i = 0; i < 10000; i++)
                {
                    socket.SendFrame(Encoding.UTF8.GetBytes("kkk"));
                    Thread.Sleep(1000);
                }
            }
        }
    }
}
