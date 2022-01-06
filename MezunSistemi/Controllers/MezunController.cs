using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MezunSistemi.Controllers
{
    public class MezunController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Sosyal()
        {          
            return View();
        }

        public ActionResult Harita()
        {   
            return View();
        }

        public ActionResult Profil()
        {
            return View();
        }
    }
}