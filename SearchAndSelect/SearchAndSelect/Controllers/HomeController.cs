using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SearchAndSelect.Controllers
{
    public class HomeController : Controller
    {

        public JsonResult Countries(string searchKey, int pageNumber = 1)
        {
            Dictionary<string, string> objDic = new Dictionary<string, string>();
            foreach (CultureInfo ObjCultureInfo in CultureInfo.GetCultures(CultureTypes.SpecificCultures))
            {
                RegionInfo objRegionInfo = new RegionInfo(ObjCultureInfo.Name);
                if (!objDic.ContainsKey(objRegionInfo.EnglishName))
                {
                    objDic.Add(objRegionInfo.EnglishName, objRegionInfo.TwoLetterISORegionName.ToLower());
                }
            }
            var obj = objDic.OrderBy(p => p.Key).Skip((pageNumber-1) * 10).Take(10);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            return View();
        }

    }
}