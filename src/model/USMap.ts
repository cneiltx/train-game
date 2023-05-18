import { Route } from "./Route";
import { RouteSegment } from "./RouteSegment";
import { USCities } from "./USCities";
import { City } from "./City";
import { GameMap } from "./GameMap";
import usMap from '../images/ttr-us-map.png';
import { TrainCardColor } from "./TrainCardColor";

export class USMap implements GameMap {
  readonly mapSource = usMap;
  readonly cities: City[] = [];
  readonly routes: Route[] = [];

  constructor() {
    this.populateCities();
    this.populateRoutes();
  }

  private populateCities() {
    this.cities.push(new City(USCities.Atlanta, 1064, 615, 156, 109, 'Atlanta', -33, -11, 'right'));
    this.cities.push(new City(USCities.Billings, 432, 215, 79, 62, 'Billings', -31, 13, 'right')); // substituted for Helena
    this.cities.push(new City(USCities.Boston, 1353, 255, 188, 66, 'Boston', 5, -15, 'left'));
    this.cities.push(new City(USCities.Calgary, 330, 25, 66, 40, 'Calgary', 45, -10, 'left'));
    this.cities.push(new City(USCities.Charleston, 1210, 608, 173, 108, 'Charleston', 15, 3, 'left'));
    this.cities.push(new City(USCities.Chicago, 936, 347, 139, 78, 'Chicago', 2, 26, 'left'));
    this.cities.push(new City(USCities.Dallas, 720, 682, 112, 118, 'Dallas', -27, -10, 'right'));
    this.cities.push(new City(USCities.Denver, 498, 437, 87, 88, 'Denver', -38, 22, 'right'));
    this.cities.push(new City(USCities.ElPaso, 450, 708, 81, 120, 'El Paso', 5, 25, 'right'));
    this.cities.push(new City(USCities.Houston, 762, 769, 115, 128, 'Houston', 0, 25, 'center'));
    this.cities.push(new City(USCities.KansasCity, 760, 465, 117, 91, 'Kansas\nCity', 7, 31, 'left'));
    this.cities.push(new City(USCities.LasVegas, 213, 524, 52, 97, 'Las Vegas', -5, 21, 'left'));
    this.cities.push(new City(USCities.LittleRock, 843, 608, 128, 109, 'Little\nRock', 12, 15, 'left'));
    this.cities.push(new City(USCities.LosAngeles, 105, 573, 36, 102, 'Los\nAngeles', 5, 20, 'right'));
    this.cities.push(new City(USCities.Miami, 1238, 862, 176, 137, 'Miami', 15, 0, 'left'));
    this.cities.push(new City(USCities.Minneapolis, 799, 266, 122, 68, 'Minneapolis', -37, 15, 'right')); // substituted for Duluth
    this.cities.push(new City(USCities.Montreal, 1264, 158, 176, 55, 'Montreal', -10, -20, 'left'));
    this.cities.push(new City(USCities.Nashville, 985, 545, 145, 102, 'Nashville', 15, 0, 'left'));
    this.cities.push(new City(USCities.NewOrleans, 932, 766, 138, 127, 'New\nOrleans', 10, 22, 'right'));
    this.cities.push(new City(USCities.NewYork, 1304, 316, 182, 73, 'New York', 12, 17, 'left'));
    this.cities.push(new City(USCities.OklahomaCity, 697, 588, 110, 106, 'Oklahoma\nCity', 40, -31, 'left'));
    this.cities.push(new City(USCities.Omaha, 724, 389, 113, 82, 'Omaha', -11, 24, 'right'));
    this.cities.push(new City(USCities.Phoenix, 286, 614, 60, 109, 'Phoenix', 5, 21, 'right'));
    this.cities.push(new City(USCities.Pittsburgh, 1148, 364, 165, 80, 'Pittsburgh', -8, -41, 'right'));
    this.cities.push(new City(USCities.Portland, 84, 188, 37, 57, 'Portland', 26, -3, 'left'));
    this.cities.push(new City(USCities.Raleigh, 1208, 516, 174, 98, 'Raleigh', 15, 0, 'left'));
    this.cities.push(new City(USCities.SaintLouis, 877, 472, 131, 93, 'Saint\nLouis', -12, -47, 'right'));
    this.cities.push(new City(USCities.SaltLakeCity, 318, 381, 63, 82, 'Salt Lake City', -45, -20, 'right'));
    this.cities.push(new City(USCities.SanFrancisco, 27, 430, 30, 88, 'San Francisco', 30, 27, 'left'));
    this.cities.push(new City(USCities.SantaFe, 458, 564, 81, 104, 'Santa Fe', 9, 26, 'left'));
    this.cities.push(new City(USCities.SaultSteMarie, 1005, 175, 148, 59, 'Sault Ste.\nMarie', 0, -44, 'center'));
    this.cities.push(new City(USCities.Seattle, 116, 106, 41, 49, 'Seattle', -15, 0, 'right'));
    this.cities.push(new City(USCities.Toronto, 1154, 255, 165, 66, 'Toronto', 12, 17, 'left'));
    this.cities.push(new City(USCities.Vancouver, 120, 45, 41, 41, 'Vancouver', 5, -21, 'right'));
    this.cities.push(new City(USCities.Washington, 1229, 402, 175, 84, 'Washington', 16, 22, 'left'));
    this.cities.push(new City(USCities.Winnipeg, 698, 91, 109, 47, 'Winnipeg', -10, -20, 'left'));
  }

  private populateRoutes() {
    let id = 0;
    let route = new Route(id++, USCities.Vancouver, USCities.Calgary, TrainCardColor.Wild, 53);
    this.routes.push(route);
    route.segments.push(new RouteSegment(167, 39, -5));
    route.segments.push(new RouteSegment(225, 34, -5));
    route.segments.push(new RouteSegment(283, 29, -5));

    route = new Route(id++, USCities.Calgary, USCities.Winnipeg, TrainCardColor.White, 50);
    this.routes.push(route);
    route.segments.push(new RouteSegment(378, 33, 10));
    route.segments.push(new RouteSegment(432, 43, 10));
    route.segments.push(new RouteSegment(486, 53, 10));
    route.segments.push(new RouteSegment(540, 63, 10));
    route.segments.push(new RouteSegment(594, 73, 10));
    route.segments.push(new RouteSegment(648, 83, 10));

    route = new Route(id++, USCities.Winnipeg, USCities.SaultSteMarie, TrainCardColor.Wild, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(740, 102, 15));
    route.segments.push(new RouteSegment(784, 114, 15));
    route.segments.push(new RouteSegment(828, 126, 15));
    route.segments.push(new RouteSegment(872, 138, 15));
    route.segments.push(new RouteSegment(916, 150, 15));
    route.segments.push(new RouteSegment(960, 162, 15));

    route = new Route(id++, USCities.SaultSteMarie, USCities.Montreal, TrainCardColor.Black, 39);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1046, 168, -7));
    route.segments.push(new RouteSegment(1089, 163, -7));
    route.segments.push(new RouteSegment(1133, 158, -7));
    route.segments.push(new RouteSegment(1176, 153, -7));
    route.segments.push(new RouteSegment(1219, 152, 5));

    route = new Route(id++, USCities.Montreal, USCities.Boston, TrainCardColor.Wild, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1286, 196, 50));
    route.segments.push(new RouteSegment(1316, 231, 50));

    route = new Route(id++, USCities.Montreal, USCities.Boston, TrainCardColor.Wild, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1301, 184, 50));
    route.segments.push(new RouteSegment(1331, 219, 50));

    route = new Route(id++, USCities.Vancouver, USCities.Seattle, TrainCardColor.Wild, 30);
    this.routes.push(route);
    route.segments.push(new RouteSegment(107, 75, -86));

    route = new Route(id++, USCities.Vancouver, USCities.Seattle, TrainCardColor.Wild, 30);
    this.routes.push(route);
    route.segments.push(new RouteSegment(126, 76, -86));

    route = new Route(id++, USCities.Seattle, USCities.Calgary, TrainCardColor.Wild, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(162, 105, 0));
    route.segments.push(new RouteSegment(211, 101, -9));
    route.segments.push(new RouteSegment(260, 89, -19));
    route.segments.push(new RouteSegment(303, 59, -50));

    route = new Route(id++, USCities.Seattle, USCities.Billings, TrainCardColor.Yellow, 44);
    this.routes.push(route);
    route.segments.push(new RouteSegment(150, 135, 30));
    route.segments.push(new RouteSegment(197, 154, 15));
    route.segments.push(new RouteSegment(245, 167, 15));
    route.segments.push(new RouteSegment(292, 180, 15));
    route.segments.push(new RouteSegment(339, 193, 15));
    route.segments.push(new RouteSegment(386, 206, 15));

    route = new Route(id++, USCities.Calgary, USCities.Billings, TrainCardColor.Wild, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(346, 62, 60));
    route.segments.push(new RouteSegment(368, 101, 60));
    route.segments.push(new RouteSegment(390, 140, 60));
    route.segments.push(new RouteSegment(412, 179, 60));

    route = new Route(id++, USCities.Billings, USCities.Winnipeg, TrainCardColor.Blue, 58);
    this.routes.push(route);
    route.segments.push(new RouteSegment(470, 179, -40));
    route.segments.push(new RouteSegment(530, 154, -5));
    route.segments.push(new RouteSegment(593, 149, -5));
    route.segments.push(new RouteSegment(654, 126, -38));

    route = new Route(id++, USCities.Billings, USCities.Minneapolis, TrainCardColor.Orange, 49);
    this.routes.push(route);
    route.segments.push(new RouteSegment(480, 220, 8));
    route.segments.push(new RouteSegment(534, 228, 8));
    route.segments.push(new RouteSegment(588, 236, 8));
    route.segments.push(new RouteSegment(642, 244, 8));
    route.segments.push(new RouteSegment(696, 252, 8));
    route.segments.push(new RouteSegment(750, 260, 8));

    route = new Route(id++, USCities.Winnipeg, USCities.Minneapolis, TrainCardColor.Black, 37);
    this.routes.push(route);
    route.segments.push(new RouteSegment(715, 128, 58));
    route.segments.push(new RouteSegment(737, 163, 58));
    route.segments.push(new RouteSegment(759, 198, 58));
    route.segments.push(new RouteSegment(781, 233, 58));

    route = new Route(id++, USCities.Minneapolis, USCities.Toronto, TrainCardColor.Purple, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(850, 264, -2));
    route.segments.push(new RouteSegment(901, 262, -2));
    route.segments.push(new RouteSegment(952, 260, -2));
    route.segments.push(new RouteSegment(1003, 258, -2));
    route.segments.push(new RouteSegment(1054, 256, -2));
    route.segments.push(new RouteSegment(1105, 254, -2));

    route = new Route(id++, USCities.Minneapolis, USCities.SaultSteMarie, TrainCardColor.Wild, 55);
    this.routes.push(route);
    route.segments.push(new RouteSegment(840, 231, -35));
    route.segments.push(new RouteSegment(898, 213, -2));
    route.segments.push(new RouteSegment(958, 200, -25));

    route = new Route(id++, USCities.SaultSteMarie, USCities.Toronto, TrainCardColor.Wild, 55);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1050, 202, 20));
    route.segments.push(new RouteSegment(1106, 224, 23));

    route = new Route(id++, USCities.Seattle, USCities.Portland, TrainCardColor.Wild, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(92, 145, -67));

    route = new Route(id++, USCities.Seattle, USCities.Portland, TrainCardColor.Wild, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(110, 153, -67));

    route = new Route(id++, USCities.Portland, USCities.SanFrancisco, TrainCardColor.Green, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(55, 214, -60));
    route.segments.push(new RouteSegment(35, 255, -70));
    route.segments.push(new RouteSegment(23, 299, -80));
    route.segments.push(new RouteSegment(19, 343, -90));
    route.segments.push(new RouteSegment(19, 388, -90));

    route = new Route(id++, USCities.Portland, USCities.SanFrancisco, TrainCardColor.Purple, 38);
    this.routes.push(route);
    route.segments.push(new RouteSegment(73, 223, -60));
    route.segments.push(new RouteSegment(54, 262, -70));
    route.segments.push(new RouteSegment(43, 304, -80));
    route.segments.push(new RouteSegment(39, 347, -90));
    route.segments.push(new RouteSegment(39, 390, -90));

    route = new Route(id++, USCities.Portland, USCities.SaltLakeCity, TrainCardColor.Blue, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(118, 212, 40));
    route.segments.push(new RouteSegment(152, 240, 40));
    route.segments.push(new RouteSegment(186, 268, 40));
    route.segments.push(new RouteSegment(220, 296, 40));
    route.segments.push(new RouteSegment(254, 324, 40));
    route.segments.push(new RouteSegment(288, 352, 40));

    route = new Route(id++, USCities.SanFrancisco, USCities.SaltLakeCity, TrainCardColor.Orange, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(76, 413, -10));
    route.segments.push(new RouteSegment(123, 405, -10));
    route.segments.push(new RouteSegment(170, 397, -10));
    route.segments.push(new RouteSegment(217, 389, -10));
    route.segments.push(new RouteSegment(264, 381, -10));

    route = new Route(id++, USCities.SanFrancisco, USCities.SaltLakeCity, TrainCardColor.White, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(80, 433, -10));
    route.segments.push(new RouteSegment(127, 425, -10));
    route.segments.push(new RouteSegment(174, 417, -10));
    route.segments.push(new RouteSegment(221, 409, -10));
    route.segments.push(new RouteSegment(268, 401, -10));

    route = new Route(id++, USCities.SaltLakeCity, USCities.Billings, TrainCardColor.Purple, 48);
    this.routes.push(route);
    route.segments.push(new RouteSegment(344, 341, -57));
    route.segments.push(new RouteSegment(372, 297, -57));
    route.segments.push(new RouteSegment(400, 253, -57));

    route = new Route(id++, USCities.SanFrancisco, USCities.LosAngeles, TrainCardColor.Yellow, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(28, 473, 75));
    route.segments.push(new RouteSegment(44, 516, 65));
    route.segments.push(new RouteSegment(70, 554, 45));

    route = new Route(id++, USCities.SanFrancisco, USCities.LosAngeles, TrainCardColor.Purple, 36);
    this.routes.push(route);
    route.segments.push(new RouteSegment(47, 466, 75));
    route.segments.push(new RouteSegment(61, 505, 65));
    route.segments.push(new RouteSegment(85, 540, 45));

    route = new Route(id++, USCities.LosAngeles, USCities.LasVegas, TrainCardColor.Wild, 37);
    this.routes.push(route);
    route.segments.push(new RouteSegment(135, 544, -40));
    route.segments.push(new RouteSegment(174, 527, -8));

    route = new Route(id++, USCities.LasVegas, USCities.SaltLakeCity, TrainCardColor.Orange, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(249, 496, -45));
    route.segments.push(new RouteSegment(278, 462, -55));
    route.segments.push(new RouteSegment(300, 423, -65));

    route = new Route(id++, USCities.Billings, USCities.Denver, TrainCardColor.Green, 44);
    this.routes.push(route);
    route.segments.push(new RouteSegment(436, 260, 80));
    route.segments.push(new RouteSegment(453, 306, 60));
    route.segments.push(new RouteSegment(473, 350, 73));
    route.segments.push(new RouteSegment(487, 396, 73));

    route = new Route(id++, USCities.SaltLakeCity, USCities.Denver, TrainCardColor.Red, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(364, 385, 20));
    route.segments.push(new RouteSegment(409, 401, 20));
    route.segments.push(new RouteSegment(454, 417, 20));

    route = new Route(id++, USCities.SaltLakeCity, USCities.Denver, TrainCardColor.Yellow, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(357, 404, 20));
    route.segments.push(new RouteSegment(402, 420, 20));
    route.segments.push(new RouteSegment(447, 436, 20));

    route = new Route(id++, USCities.LosAngeles, USCities.ElPaso, TrainCardColor.Black, 53);
    this.routes.push(route);
    route.segments.push(new RouteSegment(140, 610, 40));
    route.segments.push(new RouteSegment(185, 645, 35));
    route.segments.push(new RouteSegment(233, 676, 30));
    route.segments.push(new RouteSegment(286, 698, 15));
    route.segments.push(new RouteSegment(343, 708, 5));
    route.segments.push(new RouteSegment(400, 710, 0));

    route = new Route(id++, USCities.LosAngeles, USCities.Phoenix, TrainCardColor.Wild, 44);
    this.routes.push(route);
    route.segments.push(new RouteSegment(149, 583, 14));
    route.segments.push(new RouteSegment(197, 595, 14));
    route.segments.push(new RouteSegment(245, 606, 14));

    route = new Route(id++, USCities.Phoenix, USCities.Denver, TrainCardColor.White, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(313, 580, -50));
    route.segments.push(new RouteSegment(348, 549, -35));
    route.segments.push(new RouteSegment(390, 527, -22));
    route.segments.push(new RouteSegment(432, 505, -35));
    route.segments.push(new RouteSegment(466, 473, -50));

    route = new Route(id++, USCities.Phoenix, USCities.SantaFe, TrainCardColor.Wild, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(330, 607, -15));
    route.segments.push(new RouteSegment(375, 593, -20));
    route.segments.push(new RouteSegment(420, 577, -20));

    route = new Route(id++, USCities.Phoenix, USCities.ElPaso, TrainCardColor.Wild, 44);
    this.routes.push(route);
    route.segments.push(new RouteSegment(326, 643, 30));
    route.segments.push(new RouteSegment(371, 661, 14));
    route.segments.push(new RouteSegment(415, 680, 35));

    route = new Route(id++, USCities.ElPaso, USCities.SantaFe, TrainCardColor.Wild, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(453, 661, -88));
    route.segments.push(new RouteSegment(455, 610, -88));

    route = new Route(id++, USCities.SantaFe, USCities.Denver, TrainCardColor.Wild, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(478, 530, -60));
    route.segments.push(new RouteSegment(494, 486, -80));

    route = new Route(id++, USCities.Denver, USCities.Omaha, TrainCardColor.Purple, 45);
    this.routes.push(route);
    route.segments.push(new RouteSegment(532, 408, -35));
    route.segments.push(new RouteSegment(580, 393, 0));
    route.segments.push(new RouteSegment(630, 393, 0));
    route.segments.push(new RouteSegment(679, 391, -5));

    route = new Route(id++, USCities.Billings, USCities.Omaha, TrainCardColor.Red, 56);
    this.routes.push(route);
    route.segments.push(new RouteSegment(468, 251, 45));
    route.segments.push(new RouteSegment(518, 285, 25));
    route.segments.push(new RouteSegment(574, 307, 18));
    route.segments.push(new RouteSegment(632, 325, 18));
    route.segments.push(new RouteSegment(685, 355, 40));

    route = new Route(id++, USCities.Omaha, USCities.Minneapolis, TrainCardColor.Wild, 45);
    this.routes.push(route);
    route.segments.push(new RouteSegment(738, 343, -58));
    route.segments.push(new RouteSegment(764, 301, -58));

    route = new Route(id++, USCities.Omaha, USCities.Minneapolis, TrainCardColor.Wild, 45);
    this.routes.push(route);
    route.segments.push(new RouteSegment(756, 353, -58));
    route.segments.push(new RouteSegment(782, 311, -58));

    route = new Route(id++, USCities.Minneapolis, USCities.Chicago, TrainCardColor.Red, 36);
    this.routes.push(route);
    route.segments.push(new RouteSegment(831, 294, 38));
    route.segments.push(new RouteSegment(871, 307, 0));
    route.segments.push(new RouteSegment(910, 320, 40));

    route = new Route(id++, USCities.Omaha, USCities.KansasCity, TrainCardColor.Wild, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(733, 432, 65));

    route = new Route(id++, USCities.Omaha, USCities.KansasCity, TrainCardColor.Wild, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(751, 424, 65));

    route = new Route(id++, USCities.Omaha, USCities.Chicago, TrainCardColor.Blue, 39);
    this.routes.push(route);
    route.segments.push(new RouteSegment(769, 388, 0));
    route.segments.push(new RouteSegment(812, 381, -20));
    route.segments.push(new RouteSegment(853, 366, -20));
    route.segments.push(new RouteSegment(894, 355, -10));

    route = new Route(id++, USCities.Chicago, USCities.Toronto, TrainCardColor.White, 50);
    this.routes.push(route);
    route.segments.push(new RouteSegment(960, 310, -50));
    route.segments.push(new RouteSegment(1010, 286, 0));
    route.segments.push(new RouteSegment(1065, 294, 17));
    route.segments.push(new RouteSegment(1119, 284, -40));

    route = new Route(id++, USCities.Toronto, USCities.Pittsburgh, TrainCardColor.Wild, 30);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1153, 293, -85));
    route.segments.push(new RouteSegment(1150, 327, -85));

    route = new Route(id++, USCities.Boston, USCities.NewYork, TrainCardColor.Yellow, 25);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1331, 269, -50));
    route.segments.push(new RouteSegment(1312, 292, -50));

    route = new Route(id++, USCities.Boston, USCities.NewYork, TrainCardColor.Red, 25);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1347, 281, -50));
    route.segments.push(new RouteSegment(1328, 304, -50));

    route = new Route(id++, USCities.Montreal, USCities.NewYork, TrainCardColor.Blue, 41);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1251, 202, 100));
    route.segments.push(new RouteSegment(1250, 247, 82));
    route.segments.push(new RouteSegment(1272, 290, 45));

    route = new Route(id++, USCities.Toronto, USCities.Montreal, TrainCardColor.Wild, 32);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1226, 180, -30));
    route.segments.push(new RouteSegment(1191, 192, -5));
    route.segments.push(new RouteSegment(1163, 215, -75));

    route = new Route(id++, USCities.NewYork, USCities.Washington, TrainCardColor.Orange, 32);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1290, 354, -80));
    route.segments.push(new RouteSegment(1263, 382, -10));

    route = new Route(id++, USCities.NewYork, USCities.Washington, TrainCardColor.Black, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1308, 365, -80));
    route.segments.push(new RouteSegment(1273, 400, -10));

    route = new Route(id++, USCities.Pittsburgh, USCities.NewYork, TrainCardColor.White, 52);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1192, 339, -18));
    route.segments.push(new RouteSegment(1246, 322, -18));

    route = new Route(id++, USCities.Pittsburgh, USCities.NewYork, TrainCardColor.Green, 52);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1198, 357, -18));
    route.segments.push(new RouteSegment(1252, 340, -18));

    route = new Route(id++, USCities.Pittsburgh, USCities.Washington, TrainCardColor.Wild, 25);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1174, 390, 45));
    route.segments.push(new RouteSegment(1203, 402, 0));

    route = new Route(id++, USCities.Chicago, USCities.Pittsburgh, TrainCardColor.Orange, 47);
    this.routes.push(route);
    route.segments.push(new RouteSegment(987, 336, 5));
    route.segments.push(new RouteSegment(1039, 340, 5));
    route.segments.push(new RouteSegment(1090, 344, 5));

    route = new Route(id++, USCities.Chicago, USCities.Pittsburgh, TrainCardColor.Black, 47);
    this.routes.push(route);
    route.segments.push(new RouteSegment(985, 355, 5));
    route.segments.push(new RouteSegment(1037, 359, 5));
    route.segments.push(new RouteSegment(1088, 363, 5));

    route = new Route(id++, USCities.Raleigh, USCities.Washington, TrainCardColor.Wild, 34);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1206, 477, -80));
    route.segments.push(new RouteSegment(1213, 439, -80));

    route = new Route(id++, USCities.Raleigh, USCities.Washington, TrainCardColor.Wild, 34);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1225, 480, -80));
    route.segments.push(new RouteSegment(1232, 442, -80));

    route = new Route(id++, USCities.Pittsburgh, USCities.Raleigh, TrainCardColor.Wild, 56);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1150, 422, 90));
    route.segments.push(new RouteSegment(1170, 480, 52));

    route = new Route(id++, USCities.Nashville, USCities.Pittsburgh, TrainCardColor.Yellow, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1010, 505, -53));
    route.segments.push(new RouteSegment(1045, 471, -33));
    route.segments.push(new RouteSegment(1087, 446, -27));
    route.segments.push(new RouteSegment(1123, 412, -65));

    route = new Route(id++, USCities.SaintLouis, USCities.Pittsburgh, TrainCardColor.Green, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(923, 464, -15));
    route.segments.push(new RouteSegment(968, 450, -20));
    route.segments.push(new RouteSegment(1013, 434, -20));
    route.segments.push(new RouteSegment(1058, 417, -23));
    route.segments.push(new RouteSegment(1100, 393, -35));

    route = new Route(id++, USCities.SaintLouis, USCities.Chicago, TrainCardColor.Green, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(884, 427, -62));
    route.segments.push(new RouteSegment(905, 388, -62));

    route = new Route(id++, USCities.SaintLouis, USCities.Chicago, TrainCardColor.White, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(902, 437, -62));
    route.segments.push(new RouteSegment(923, 398, -62));

    route = new Route(id++, USCities.OklahomaCity, USCities.KansasCity, TrainCardColor.Wild, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(708, 542, -60));
    route.segments.push(new RouteSegment(732, 500, -60));

    route = new Route(id++, USCities.OklahomaCity, USCities.KansasCity, TrainCardColor.Wild, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(725, 552, -60));
    route.segments.push(new RouteSegment(749, 510, -60));

    route = new Route(id++, USCities.KansasCity, USCities.SaintLouis, TrainCardColor.Blue, 35);
    this.routes.push(route);
    route.segments.push(new RouteSegment(800, 457, 5));
    route.segments.push(new RouteSegment(840, 460, 5));

    route = new Route(id++, USCities.KansasCity, USCities.SaintLouis, TrainCardColor.Purple, 35);
    this.routes.push(route);
    route.segments.push(new RouteSegment(799, 477, 5));
    route.segments.push(new RouteSegment(839, 480, 5));

    route = new Route(id++, USCities.Denver, USCities.OklahomaCity, TrainCardColor.Red, 47);
    this.routes.push(route);
    route.segments.push(new RouteSegment(527, 482, 55));
    route.segments.push(new RouteSegment(572, 508, 5));
    route.segments.push(new RouteSegment(622, 520, 20));
    route.segments.push(new RouteSegment(665, 550, 50));

    route = new Route(id++, USCities.Denver, USCities.KansasCity, TrainCardColor.Black, 45);
    this.routes.push(route);
    route.segments.push(new RouteSegment(549, 436, 8));
    route.segments.push(new RouteSegment(599, 443, 8));
    route.segments.push(new RouteSegment(649, 450, 8));
    route.segments.push(new RouteSegment(699, 457, 8));

    route = new Route(id++, USCities.OklahomaCity, USCities.Dallas, TrainCardColor.Wild, 25);
    this.routes.push(route);
    route.segments.push(new RouteSegment(693, 625, 72));
    route.segments.push(new RouteSegment(702, 654, 72));

    route = new Route(id++, USCities.OklahomaCity, USCities.Dallas, TrainCardColor.Wild, 25);
    this.routes.push(route);
    route.segments.push(new RouteSegment(712, 619, 72));
    route.segments.push(new RouteSegment(721, 648, 72));

    route = new Route(id++, USCities.Dallas, USCities.Houston, TrainCardColor.Wild, 56);
    this.routes.push(route);
    route.segments.push(new RouteSegment(732, 729, 65));

    route = new Route(id++, USCities.Dallas, USCities.Houston, TrainCardColor.Wild, 56);
    this.routes.push(route);
    route.segments.push(new RouteSegment(751, 721, 65));

    route = new Route(id++, USCities.SantaFe, USCities.OklahomaCity, TrainCardColor.Blue, 60);
    this.routes.push(route);
    route.segments.push(new RouteSegment(513, 568, 6));
    route.segments.push(new RouteSegment(577, 575, 6));
    route.segments.push(new RouteSegment(641, 582, 6));

    route = new Route(id++, USCities.ElPaso, USCities.OklahomaCity, TrainCardColor.Yellow, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(486, 678, -40));
    route.segments.push(new RouteSegment(527, 657, -15));
    route.segments.push(new RouteSegment(571, 645, -15));
    route.segments.push(new RouteSegment(615, 633, -15));
    route.segments.push(new RouteSegment(657, 616, -30));

    route = new Route(id++, USCities.ElPaso, USCities.Dallas, TrainCardColor.Red, 53);
    this.routes.push(route);
    route.segments.push(new RouteSegment(502, 708, -6));
    route.segments.push(new RouteSegment(560, 702, -6));
    route.segments.push(new RouteSegment(618, 696, -6));
    route.segments.push(new RouteSegment(676, 690, -6));

    route = new Route(id++, USCities.ElPaso, USCities.Houston, TrainCardColor.Green, 41);
    this.routes.push(route);
    route.segments.push(new RouteSegment(491, 739, 25));
    route.segments.push(new RouteSegment(534, 755, 15));
    route.segments.push(new RouteSegment(578, 765, 11));
    route.segments.push(new RouteSegment(624, 770, 0));
    route.segments.push(new RouteSegment(670, 770, 0));
    route.segments.push(new RouteSegment(716, 770, 0));

    route = new Route(id++, USCities.OklahomaCity, USCities.LittleRock, TrainCardColor.Wild, 47);
    this.routes.push(route);
    route.segments.push(new RouteSegment(744, 594, 9));
    route.segments.push(new RouteSegment(795, 602, 9));

    route = new Route(id++, USCities.Dallas, USCities.LittleRock, TrainCardColor.Wild, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(758, 662, -31));
    route.segments.push(new RouteSegment(802, 636, -31));

    route = new Route(id++, USCities.SaintLouis, USCities.Nashville, TrainCardColor.Wild, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(911, 499, 34));
    route.segments.push(new RouteSegment(949, 524, 34));

    route = new Route(id++, USCities.LittleRock, USCities.SaintLouis, TrainCardColor.Wild, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(854, 565, -75));
    route.segments.push(new RouteSegment(867, 516, -75));

    route = new Route(id++, USCities.LittleRock, USCities.Nashville, TrainCardColor.White, 34);
    this.routes.push(route);
    route.segments.push(new RouteSegment(877, 595, -26));
    route.segments.push(new RouteSegment(912, 578, -26));
    route.segments.push(new RouteSegment(947, 561, -26));

    route = new Route(id++, USCities.Houston, USCities.NewOrleans, TrainCardColor.Wild, 57);
    this.routes.push(route);
    route.segments.push(new RouteSegment(813, 768, -1));
    route.segments.push(new RouteSegment(875, 767, -1));

    route = new Route(id++, USCities.LittleRock, USCities.NewOrleans, TrainCardColor.Green, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(843, 652, 90));
    route.segments.push(new RouteSegment(861, 698, 50));
    route.segments.push(new RouteSegment(894, 733, 45));

    route = new Route(id++, USCities.Nashville, USCities.Atlanta, TrainCardColor.Wild, 58);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1023, 581, 42));

    route = new Route(id++, USCities.Atlanta, USCities.Raleigh, TrainCardColor.Wild, 58);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1102, 572, -37));
    route.segments.push(new RouteSegment(1153, 534, -37));

    route = new Route(id++, USCities.Atlanta, USCities.Raleigh, TrainCardColor.Wild, 58);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1114, 588, -37));
    route.segments.push(new RouteSegment(1165, 550, -37));

    route = new Route(id++, USCities.Raleigh, USCities.Charleston, TrainCardColor.Wild, 30);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1225, 545, 60));
    route.segments.push(new RouteSegment(1225, 581, 120));

    route = new Route(id++, USCities.NewOrleans, USCities.Atlanta, TrainCardColor.Yellow, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(927, 718, -90));
    route.segments.push(new RouteSegment(939, 672, -60));
    route.segments.push(new RouteSegment(973, 638, -30));
    route.segments.push(new RouteSegment(1018, 622, -10));

    route = new Route(id++, USCities.NewOrleans, USCities.Atlanta, TrainCardColor.Orange, 35);
    this.routes.push(route);
    route.segments.push(new RouteSegment(946, 721, -90));
    route.segments.push(new RouteSegment(956, 681, -60));
    route.segments.push(new RouteSegment(986, 653, -30));
    route.segments.push(new RouteSegment(1025, 640, -10));

    route = new Route(id++, USCities.Atlanta, USCities.Miami, TrainCardColor.Blue, 47);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1090, 655, 55));
    route.segments.push(new RouteSegment(1120, 698, 55));
    route.segments.push(new RouteSegment(1150, 741, 55));
    route.segments.push(new RouteSegment(1180, 784, 55));
    route.segments.push(new RouteSegment(1210, 827, 55));

    route = new Route(id++, USCities.Charleston, USCities.Miami, TrainCardColor.Purple, 52);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1187, 651, 115));
    route.segments.push(new RouteSegment(1182, 709, 75));
    route.segments.push(new RouteSegment(1206, 762, 55));
    route.segments.push(new RouteSegment(1232, 813, 72));

    route = new Route(id++, USCities.NewOrleans, USCities.Miami, TrainCardColor.Red, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(978, 748, -15));
    route.segments.push(new RouteSegment(1029, 741, 0));
    route.segments.push(new RouteSegment(1080, 745, 10));
    route.segments.push(new RouteSegment(1127, 769, 45));
    route.segments.push(new RouteSegment(1160, 808, 55));
    route.segments.push(new RouteSegment(1194, 846, 39));

    route = new Route(id++, USCities.Atlanta, USCities.Charleston, TrainCardColor.Wild, 48);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1112, 627, 10));
    route.segments.push(new RouteSegment(1165, 621, -23));
  }
}