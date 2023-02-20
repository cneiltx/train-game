import { RouteColor } from "./RouteColor";
import { Route } from "./Route";
import { RouteSegment } from "./RouteSegment";
import { USCities } from "./USCities";

export class GameMap {
  routes: Route[];

  constructor() {
    this.routes = [];
    this.populateRoutes();
  }

  private populateRoutes() {
    let route = new Route(USCities.Vancouver, USCities.Calgary, RouteColor.Grey, 53);
    this.routes.push(route);
    route.segments.push(new RouteSegment(167, 39, -5));
    route.segments.push(new RouteSegment(225, 34, -5));
    route.segments.push(new RouteSegment(283, 29, -5));

    route = new Route('Calgary', 'Winnipeg', RouteColor.White, 50);
    this.routes.push(route);
    route.segments.push(new RouteSegment(378, 33, 10));
    route.segments.push(new RouteSegment(432, 43, 10));
    route.segments.push(new RouteSegment(486, 53, 10));
    route.segments.push(new RouteSegment(540, 63, 10));
    route.segments.push(new RouteSegment(594, 73, 10));
    route.segments.push(new RouteSegment(648, 83, 10));

    route = new Route('Winnipeg', 'Sault St. Marie', RouteColor.Grey, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(740, 102, 15));
    route.segments.push(new RouteSegment(784, 114, 15));
    route.segments.push(new RouteSegment(828, 126, 15));
    route.segments.push(new RouteSegment(872, 138, 15));
    route.segments.push(new RouteSegment(916, 150, 15));
    route.segments.push(new RouteSegment(960, 162, 15));

    route = new Route('Sault St. Marie', 'Montreal', RouteColor.Black, 39);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1046, 168, -7));
    route.segments.push(new RouteSegment(1089, 163, -7));
    route.segments.push(new RouteSegment(1133, 158, -7));
    route.segments.push(new RouteSegment(1176, 153, -7));
    route.segments.push(new RouteSegment(1219, 152, 5));

    route = new Route('Montreal', 'Boston', RouteColor.Grey, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1286, 196, 50));
    route.segments.push(new RouteSegment(1316, 231, 50));

    route = new Route('Montreal', 'Boston', RouteColor.Grey, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1301, 184, 50));
    route.segments.push(new RouteSegment(1331, 219, 50));

    route = new Route('Vancouver', 'Seattle', RouteColor.Grey, 30);
    this.routes.push(route);
    route.segments.push(new RouteSegment(107, 75, -86));

    route = new Route('Vancouver', 'Seattle', RouteColor.Grey, 30);
    this.routes.push(route);
    route.segments.push(new RouteSegment(126, 76, -86));

    route = new Route('Seattle', 'Calgary', RouteColor.Grey, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(162, 105, 0));
    route.segments.push(new RouteSegment(211, 101, -9));
    route.segments.push(new RouteSegment(260, 89, -19));
    route.segments.push(new RouteSegment(303, 59, -50));

    route = new Route('Seattle', 'Billings', RouteColor.Yellow, 44);
    this.routes.push(route);
    route.segments.push(new RouteSegment(150, 135, 30));
    route.segments.push(new RouteSegment(197, 154, 15));
    route.segments.push(new RouteSegment(245, 167, 15));
    route.segments.push(new RouteSegment(292, 180, 15));
    route.segments.push(new RouteSegment(339, 193, 15));
    route.segments.push(new RouteSegment(386, 206, 15));

    route = new Route('Calgary', 'Billings', RouteColor.Grey, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(346, 62, 60));
    route.segments.push(new RouteSegment(368, 101, 60));
    route.segments.push(new RouteSegment(390, 140, 60));
    route.segments.push(new RouteSegment(412, 179, 60));

    route = new Route('Billings', 'Winnipeg', RouteColor.Blue, 58);
    this.routes.push(route);
    route.segments.push(new RouteSegment(470, 179, -40));
    route.segments.push(new RouteSegment(530, 154, -5));
    route.segments.push(new RouteSegment(593, 149, -5));
    route.segments.push(new RouteSegment(654, 126, -38));

    route = new Route('Billings', 'Minneapolis', RouteColor.Orange, 49);
    this.routes.push(route);
    route.segments.push(new RouteSegment(480, 220, 8));
    route.segments.push(new RouteSegment(534, 228, 8));
    route.segments.push(new RouteSegment(588, 236, 8));
    route.segments.push(new RouteSegment(642, 244, 8));
    route.segments.push(new RouteSegment(696, 252, 8));
    route.segments.push(new RouteSegment(750, 260, 8));

    route = new Route('Winnipeg', 'Minneapolis', RouteColor.Black, 37);
    this.routes.push(route);
    route.segments.push(new RouteSegment(715, 128, 58));
    route.segments.push(new RouteSegment(737, 163, 58));
    route.segments.push(new RouteSegment(759, 198, 58));
    route.segments.push(new RouteSegment(781, 233, 58));

    route = new Route('Minneapolis', 'Toronto', RouteColor.Pink, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(850, 264, -2));
    route.segments.push(new RouteSegment(901, 262, -2));
    route.segments.push(new RouteSegment(952, 260, -2));
    route.segments.push(new RouteSegment(1003, 258, -2));
    route.segments.push(new RouteSegment(1054, 256, -2));
    route.segments.push(new RouteSegment(1105, 254, -2));

    route = new Route('Minneapolis', 'Sault St. Marie', RouteColor.Grey, 55);
    this.routes.push(route);
    route.segments.push(new RouteSegment(840, 231, -35));
    route.segments.push(new RouteSegment(898, 213, -2));
    route.segments.push(new RouteSegment(958, 200, -25));

    route = new Route('Sault St. Marie', 'Toronto', RouteColor.Grey, 55);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1050, 202, 20));
    route.segments.push(new RouteSegment(1106, 224, 23));

    route = new Route('Seattle', 'Portland', RouteColor.Grey, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(92, 145, -67));

    route = new Route('Seattle', 'Portland', RouteColor.Grey, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(110, 153, -67));

    route = new Route('Portland', 'San Francisco', RouteColor.Green, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(55, 214, -60));
    route.segments.push(new RouteSegment(35, 255, -70));
    route.segments.push(new RouteSegment(23, 299, -80));
    route.segments.push(new RouteSegment(19, 343, -90));
    route.segments.push(new RouteSegment(19, 388, -90));

    route = new Route('Portland', 'San Francisco', RouteColor.Pink, 38);
    this.routes.push(route);
    route.segments.push(new RouteSegment(73, 223, -60));
    route.segments.push(new RouteSegment(54, 262, -70));
    route.segments.push(new RouteSegment(43, 304, -80));
    route.segments.push(new RouteSegment(39, 347, -90));
    route.segments.push(new RouteSegment(39, 390, -90));

    route = new Route('Portland', 'Salt Lake City', RouteColor.Blue, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(118, 212, 40));
    route.segments.push(new RouteSegment(152, 240, 40));
    route.segments.push(new RouteSegment(186, 268, 40));
    route.segments.push(new RouteSegment(220, 296, 40));
    route.segments.push(new RouteSegment(254, 324, 40));
    route.segments.push(new RouteSegment(288, 352, 40));

    route = new Route('San Francisco', 'Salt Lake City', RouteColor.Orange, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(76, 413, -10));
    route.segments.push(new RouteSegment(123, 405, -10));
    route.segments.push(new RouteSegment(170, 397, -10));
    route.segments.push(new RouteSegment(217, 389, -10));
    route.segments.push(new RouteSegment(264, 381, -10));

    route = new Route('San Francisco', 'Salt Lake City', RouteColor.White, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(80, 433, -10));
    route.segments.push(new RouteSegment(127, 425, -10));
    route.segments.push(new RouteSegment(174, 417, -10));
    route.segments.push(new RouteSegment(221, 409, -10));
    route.segments.push(new RouteSegment(268, 401, -10));

    route = new Route('Salt Lake City', 'Billings', RouteColor.Pink, 48);
    this.routes.push(route);
    route.segments.push(new RouteSegment(344, 341, -57));
    route.segments.push(new RouteSegment(372, 297, -57));
    route.segments.push(new RouteSegment(400, 253, -57));

    route = new Route('San Francisco', 'Los Angeles', RouteColor.Yellow, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(28, 473, 75));
    route.segments.push(new RouteSegment(44, 516, 65));
    route.segments.push(new RouteSegment(70, 554, 45));

    route = new Route('San Francisco', 'Los Angeles', RouteColor.Pink, 36);
    this.routes.push(route);
    route.segments.push(new RouteSegment(47, 466, 75));
    route.segments.push(new RouteSegment(61, 505, 65));
    route.segments.push(new RouteSegment(85, 540, 45));

    route = new Route('Los Angeles', 'Las Vegas', RouteColor.Grey, 37);
    this.routes.push(route);
    route.segments.push(new RouteSegment(135, 544, -40));
    route.segments.push(new RouteSegment(174, 527, -8));

    route = new Route('Las Vegas', 'Salt Lake City', RouteColor.Orange, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(249, 496, -45));
    route.segments.push(new RouteSegment(278, 462, -55));
    route.segments.push(new RouteSegment(300, 423, -65));

    route = new Route('Billings', 'Denver', RouteColor.Green, 44);
    this.routes.push(route);
    route.segments.push(new RouteSegment(436, 260, 80));
    route.segments.push(new RouteSegment(453, 306, 60));
    route.segments.push(new RouteSegment(473, 350, 73));
    route.segments.push(new RouteSegment(487, 396, 73));

    route = new Route('Salt Lake City', 'Denver', RouteColor.Red, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(364, 385, 20));
    route.segments.push(new RouteSegment(409, 401, 20));
    route.segments.push(new RouteSegment(454, 417, 20));

    route = new Route('Salt Lake City', 'Denver', RouteColor.Yellow, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(357, 404, 20));
    route.segments.push(new RouteSegment(402, 420, 20));
    route.segments.push(new RouteSegment(447, 436, 20));

    route = new Route('Los Angeles', 'El Paso', RouteColor.Black, 53);
    this.routes.push(route);
    route.segments.push(new RouteSegment(140, 610, 40));
    route.segments.push(new RouteSegment(185, 645, 35));
    route.segments.push(new RouteSegment(233, 676, 30));
    route.segments.push(new RouteSegment(286, 698, 15));
    route.segments.push(new RouteSegment(343, 708, 5));
    route.segments.push(new RouteSegment(400, 710, 0));

    route = new Route('Los Angeles', 'Phoenix', RouteColor.Grey, 44);
    this.routes.push(route);
    route.segments.push(new RouteSegment(149, 583, 14));
    route.segments.push(new RouteSegment(197, 595, 14));
    route.segments.push(new RouteSegment(245, 606, 14));

    route = new Route('Phoenix', 'Denver', RouteColor.White, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(313, 580, -50));
    route.segments.push(new RouteSegment(348, 549, -35));
    route.segments.push(new RouteSegment(390, 527, -22));
    route.segments.push(new RouteSegment(432, 505, -35));
    route.segments.push(new RouteSegment(466, 473, -50));

    route = new Route('Phoenix', 'Santa Fe', RouteColor.Grey, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(330, 607, -15));
    route.segments.push(new RouteSegment(375, 593, -20));
    route.segments.push(new RouteSegment(420, 577, -20));

    route = new Route('Phoenix', 'El Paso', RouteColor.Grey, 44);
    this.routes.push(route);
    route.segments.push(new RouteSegment(326, 643, 30));
    route.segments.push(new RouteSegment(371, 661, 14));
    route.segments.push(new RouteSegment(415, 680, 35));

    route = new Route('El Paso', 'Santa Fe', RouteColor.Grey, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(453, 661, -88));
    route.segments.push(new RouteSegment(455, 610, -88));

    route = new Route('Santa Fe', 'Denver', RouteColor.Grey, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(478, 530, -60));
    route.segments.push(new RouteSegment(494, 486, -80));

    route = new Route('Denver', 'Omaha', RouteColor.Pink, 45);
    this.routes.push(route);
    route.segments.push(new RouteSegment(532, 408, -35));
    route.segments.push(new RouteSegment(580, 393, 0));
    route.segments.push(new RouteSegment(630, 393, 0));
    route.segments.push(new RouteSegment(679, 391, -5));

    route = new Route('Billings', 'Omaha', RouteColor.Red, 56);
    this.routes.push(route);
    route.segments.push(new RouteSegment(468, 251, 45));
    route.segments.push(new RouteSegment(518, 285, 25));
    route.segments.push(new RouteSegment(574, 307, 18));
    route.segments.push(new RouteSegment(632, 325, 18));
    route.segments.push(new RouteSegment(685, 355, 40));

    route = new Route('Omaha', 'Minneapolis', RouteColor.Grey, 45);
    this.routes.push(route);
    route.segments.push(new RouteSegment(738, 343, -58));
    route.segments.push(new RouteSegment(764, 301, -58));

    route = new Route('Omaha', 'Minneapolis', RouteColor.Grey, 45);
    this.routes.push(route);
    route.segments.push(new RouteSegment(756, 353, -58));
    route.segments.push(new RouteSegment(782, 311, -58));

    route = new Route('Minneapolis', 'Chicago', RouteColor.Red, 36);
    this.routes.push(route);
    route.segments.push(new RouteSegment(831, 294, 38));
    route.segments.push(new RouteSegment(871, 307, 0));
    route.segments.push(new RouteSegment(910, 320, 40));

    route = new Route('Omaha', 'Kansas City', RouteColor.Grey, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(733, 432, 65));

    route = new Route('Omaha', 'Kansas City', RouteColor.Grey, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(751, 424, 65));

    route = new Route('Omaha', 'Chicago', RouteColor.Blue, 39);
    this.routes.push(route);
    route.segments.push(new RouteSegment(769, 388, 0));
    route.segments.push(new RouteSegment(812, 381, -20));
    route.segments.push(new RouteSegment(853, 366, -20));
    route.segments.push(new RouteSegment(894, 355, -10));

    route = new Route('Chicago', 'Toronto', RouteColor.White, 50);
    this.routes.push(route);
    route.segments.push(new RouteSegment(960, 310, -50));
    route.segments.push(new RouteSegment(1010, 286, 0));
    route.segments.push(new RouteSegment(1065, 294, 17));
    route.segments.push(new RouteSegment(1119, 284, -40));

    route = new Route('Toronto', 'Pittsburgh', RouteColor.Grey, 30);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1153, 293, -85));
    route.segments.push(new RouteSegment(1150, 327, -85));

    route = new Route('Boston', 'New York', RouteColor.Yellow, 25);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1331, 269, -50));
    route.segments.push(new RouteSegment(1312, 292, -50));

    route = new Route('Boston', 'New York', RouteColor.Red, 25);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1347, 281, -50));
    route.segments.push(new RouteSegment(1328, 304, -50));

    route = new Route('Montreal', 'New York', RouteColor.Blue, 41);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1251, 202, 100));
    route.segments.push(new RouteSegment(1250, 247, 82));
    route.segments.push(new RouteSegment(1272, 290, 45));

    route = new Route('Toronto', 'Montreal', RouteColor.Grey, 32);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1226, 180, -30));
    route.segments.push(new RouteSegment(1191, 192, -5));
    route.segments.push(new RouteSegment(1163, 215, -75));

    route = new Route('New York', 'Washington', RouteColor.Orange, 32);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1290, 354, -80));
    route.segments.push(new RouteSegment(1263, 382, -10));

    route = new Route('New York', 'Washington', RouteColor.Black, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1308, 365, -80));
    route.segments.push(new RouteSegment(1273, 400, -10));

    route = new Route('Pittsburgh', 'New York', RouteColor.White, 52);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1192, 339, -18));
    route.segments.push(new RouteSegment(1246, 322, -18));

    route = new Route('Pittsburgh', 'New York', RouteColor.Green, 52);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1198, 357, -18));
    route.segments.push(new RouteSegment(1252, 340, -18));

    route = new Route('Pittsburgh', 'Washington', RouteColor.Grey, 25);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1174, 390, 45));
    route.segments.push(new RouteSegment(1203, 402, 0));

    route = new Route('Chicago', 'Pittsburgh', RouteColor.Orange, 47);
    this.routes.push(route);
    route.segments.push(new RouteSegment(987, 336, 5));
    route.segments.push(new RouteSegment(1039, 340, 5));
    route.segments.push(new RouteSegment(1090, 344, 5));

    route = new Route('Chicago', 'Pittsburgh', RouteColor.Black, 47);
    this.routes.push(route);
    route.segments.push(new RouteSegment(985, 355, 5));
    route.segments.push(new RouteSegment(1037, 359, 5));
    route.segments.push(new RouteSegment(1088, 363, 5));

    route = new Route('Raleigh', 'Washington', RouteColor.Grey, 34);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1206, 477, -80));
    route.segments.push(new RouteSegment(1213, 439, -80));

    route = new Route('Raleigh', 'Washington', RouteColor.Grey, 34);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1225, 480, -80));
    route.segments.push(new RouteSegment(1232, 442, -80));

    route = new Route('Pittsburgh', 'Raleigh', RouteColor.Grey, 56);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1150, 422, 90));
    route.segments.push(new RouteSegment(1170, 480, 52));

    route = new Route('Nashville', 'Pittsburgh', RouteColor.Yellow, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1010, 505, -53));
    route.segments.push(new RouteSegment(1045, 471, -33));
    route.segments.push(new RouteSegment(1087, 446, -27));
    route.segments.push(new RouteSegment(1123, 412, -65));

    route = new Route('Saint Louis', 'Pittsburgh', RouteColor.Green, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(923, 464, -15));
    route.segments.push(new RouteSegment(968, 450, -20));
    route.segments.push(new RouteSegment(1013, 434, -20));
    route.segments.push(new RouteSegment(1058, 417, -23));
    route.segments.push(new RouteSegment(1100, 393, -35));

    route = new Route('Saint Louis', 'Chicago', RouteColor.Green, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(884, 427, -62));
    route.segments.push(new RouteSegment(905, 388, -62));

    route = new Route('Saint Louis', 'Chicago', RouteColor.White, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(902, 437, -62));
    route.segments.push(new RouteSegment(923, 398, -62));

    route = new Route('Oklahoma City', 'Kansas City', RouteColor.Grey, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(708, 542, -60));
    route.segments.push(new RouteSegment(732, 500, -60));

    route = new Route('Oklahoma City', 'Kansas City', RouteColor.Grey, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(725, 552, -60));
    route.segments.push(new RouteSegment(749, 510, -60));

    route = new Route('Kansas City', 'Saint Louis', RouteColor.Blue, 35);
    this.routes.push(route);
    route.segments.push(new RouteSegment(800, 457, 5));
    route.segments.push(new RouteSegment(840, 460, 5));

    route = new Route('Kansas City', 'Saint Louis', RouteColor.Pink, 35);
    this.routes.push(route);
    route.segments.push(new RouteSegment(799, 477, 5));
    route.segments.push(new RouteSegment(839, 480, 5));

    route = new Route('Denver', 'Oklahoma City', RouteColor.Red, 47);
    this.routes.push(route);
    route.segments.push(new RouteSegment(527, 482, 55));
    route.segments.push(new RouteSegment(572, 508, 5));
    route.segments.push(new RouteSegment(622, 520, 20));
    route.segments.push(new RouteSegment(665, 550, 50));

    route = new Route('Denver', 'Kansas City', RouteColor.Black, 45);
    this.routes.push(route);
    route.segments.push(new RouteSegment(549, 436, 8));
    route.segments.push(new RouteSegment(599, 443, 8));
    route.segments.push(new RouteSegment(649, 450, 8));
    route.segments.push(new RouteSegment(699, 457, 8));

    route = new Route('Oklahoma City', 'Dallas', RouteColor.Grey, 25);
    this.routes.push(route);
    route.segments.push(new RouteSegment(693, 625, 72));
    route.segments.push(new RouteSegment(702, 654, 72));

    route = new Route('Oklahoma City', 'Dallas', RouteColor.Grey, 25);
    this.routes.push(route);
    route.segments.push(new RouteSegment(712, 619, 72));
    route.segments.push(new RouteSegment(721, 648, 72));

    route = new Route('Dallas', 'Houston', RouteColor.Grey, 56);
    this.routes.push(route);
    route.segments.push(new RouteSegment(732, 729, 65));

    route = new Route('Dallas', 'Houston', RouteColor.Grey, 56);
    this.routes.push(route);
    route.segments.push(new RouteSegment(751, 721, 65));

    route = new Route('Santa Fe', 'Oklahoma City', RouteColor.Blue, 60);
    this.routes.push(route);
    route.segments.push(new RouteSegment(513, 568, 6));
    route.segments.push(new RouteSegment(577, 575, 6));
    route.segments.push(new RouteSegment(641, 582, 6));

    route = new Route('El Paso', 'Oklahoma City', RouteColor.Yellow, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(486, 678, -40));
    route.segments.push(new RouteSegment(527, 657, -15));
    route.segments.push(new RouteSegment(571, 645, -15));
    route.segments.push(new RouteSegment(615, 633, -15));
    route.segments.push(new RouteSegment(657, 616, -30));

    route = new Route('El Paso', 'Dallas', RouteColor.Red, 53);
    this.routes.push(route);
    route.segments.push(new RouteSegment(502, 708, -6));
    route.segments.push(new RouteSegment(560, 702, -6));
    route.segments.push(new RouteSegment(618, 696, -6));
    route.segments.push(new RouteSegment(676, 690, -6));

    route = new Route('El Paso', 'Houston', RouteColor.Green, 41);
    this.routes.push(route);
    route.segments.push(new RouteSegment(491, 739, 25));
    route.segments.push(new RouteSegment(534, 755, 15));
    route.segments.push(new RouteSegment(578, 765, 11));
    route.segments.push(new RouteSegment(624, 770, 0));
    route.segments.push(new RouteSegment(670, 770, 0));
    route.segments.push(new RouteSegment(716, 770, 0));

    route = new Route('Oklahoma City', 'Little Rock', RouteColor.Grey, 47);
    this.routes.push(route);
    route.segments.push(new RouteSegment(744, 594, 9));
    route.segments.push(new RouteSegment(795, 602, 9));

    route = new Route('Dallas', 'Little Rock', RouteColor.Grey, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(758, 662, -31));
    route.segments.push(new RouteSegment(802, 636, -31));

    route = new Route('Saint Louis', 'Nashville', RouteColor.Grey, 40);
    this.routes.push(route);
    route.segments.push(new RouteSegment(911, 499, 34));
    route.segments.push(new RouteSegment(949, 524, 34));

    route = new Route('Little Rock', 'Saint Louis', RouteColor.Grey, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(854, 565, -75));
    route.segments.push(new RouteSegment(867, 516, -75));

    route = new Route('Little Rock', 'Nashville', RouteColor.White, 34);
    this.routes.push(route);
    route.segments.push(new RouteSegment(877, 595, -26));
    route.segments.push(new RouteSegment(912, 578, -26));
    route.segments.push(new RouteSegment(947, 561, -26));

    route = new Route('Houston', 'New Orleans', RouteColor.Grey, 57);
    this.routes.push(route);
    route.segments.push(new RouteSegment(813, 768, -1));
    route.segments.push(new RouteSegment(875, 767, -1));

    route = new Route('Little Rock', 'New Orleans', RouteColor.Green, 43);
    this.routes.push(route);
    route.segments.push(new RouteSegment(843, 652, 90));
    route.segments.push(new RouteSegment(861, 698, 50));
    route.segments.push(new RouteSegment(894, 733, 45));

    route = new Route('Nashville', 'Atlanta', RouteColor.Grey, 58);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1023, 581, 42));

    route = new Route('Atlanta', 'Raleigh', RouteColor.Grey, 58);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1102, 572, -37));
    route.segments.push(new RouteSegment(1153, 534, -37));

    route = new Route('Atlanta', 'Raleigh', RouteColor.Grey, 58);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1114, 588, -37));
    route.segments.push(new RouteSegment(1165, 550, -37));

    route = new Route('Raleigh', 'Charleston', RouteColor.Grey, 30);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1225, 545, 60));
    route.segments.push(new RouteSegment(1225, 581, 120));

    route = new Route('New Orleans', 'Atlanta', RouteColor.Yellow, 42);
    this.routes.push(route);
    route.segments.push(new RouteSegment(927, 718, -90));
    route.segments.push(new RouteSegment(939, 672, -60));
    route.segments.push(new RouteSegment(973, 638, -30));
    route.segments.push(new RouteSegment(1018, 622, -10));

    route = new Route('New Orleans', 'Atlanta', RouteColor.Orange, 35);
    this.routes.push(route);
    route.segments.push(new RouteSegment(946, 721, -90));
    route.segments.push(new RouteSegment(956, 681, -60));
    route.segments.push(new RouteSegment(986, 653, -30));
    route.segments.push(new RouteSegment(1025, 640, -10));

    route = new Route('Atlanta', 'Miami', RouteColor.Blue, 47);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1090, 655, 55));
    route.segments.push(new RouteSegment(1120, 698, 55));
    route.segments.push(new RouteSegment(1150, 741, 55));
    route.segments.push(new RouteSegment(1180, 784, 55));
    route.segments.push(new RouteSegment(1210, 827, 55));

    route = new Route('Charleston', 'Miami', RouteColor.Pink, 52);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1187, 651, 115));
    route.segments.push(new RouteSegment(1182, 709, 75));
    route.segments.push(new RouteSegment(1206, 762, 55));
    route.segments.push(new RouteSegment(1232, 813, 72));

    route = new Route('New Orleans', 'Miami', RouteColor.Red, 46);
    this.routes.push(route);
    route.segments.push(new RouteSegment(978, 748, -15));
    route.segments.push(new RouteSegment(1029, 741, 0));
    route.segments.push(new RouteSegment(1080, 745, 10));
    route.segments.push(new RouteSegment(1127, 769, 45));
    route.segments.push(new RouteSegment(1160, 808, 55));
    route.segments.push(new RouteSegment(1194, 846, 39));

    route = new Route('Atlanta', 'Charleston', RouteColor.Grey, 48);
    this.routes.push(route);
    route.segments.push(new RouteSegment(1112, 627, 10));
    route.segments.push(new RouteSegment(1165, 621, -23));
  }
}