using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;

namespace SearchAndSelect.Controllers
{

    public class Result
    {
        public int TotalRecords { get; set; }
        public IEnumerable<KeyValuePair<string, string>> Records { get; set; }
    }


    public class HomeController : Controller
    {

        public JsonResult Countries(string searchKey, int pageNumber = 1)
        {

            Result result = new Result();

            Dictionary<string, string> countries = new Dictionary<string, string>();
            foreach (CultureInfo cultureInfo in CultureInfo.GetCultures(CultureTypes.SpecificCultures))
            {
                RegionInfo regionInfo = new RegionInfo(cultureInfo.Name);
                if (countries.ContainsKey(regionInfo.EnglishName)) continue;
                if (searchKey != null && searchKey.Length > 0)
                {
                    if (regionInfo.EnglishName.StartsWith(searchKey,System.StringComparison.InvariantCultureIgnoreCase))
                        countries.Add(regionInfo.EnglishName, regionInfo.TwoLetterISORegionName.ToLower());
                }
                else
                    countries.Add(regionInfo.EnglishName, regionInfo.TwoLetterISORegionName.ToLower());
            }
            result.TotalRecords = countries.Count;
            result.Records = countries.OrderBy(p => p.Key).Skip((pageNumber - 1) * 10).Take(10);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            return View();
        }

    }
}