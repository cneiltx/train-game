import { Color } from "./Color";
import { Route } from "./Route";
import { RoutePosition } from "./RoutePosition";

export class GameMap {
  routes: Route[];

  constructor() {
    this.routes = [];
    this.populateRoutes();
  }

  private populateRoutes() {
    let route = new Route('Vancouver', 'Calgary', Color.Grey, 53);
    this.routes.push(route);
    route.positions.push(new RoutePosition(167, 39, -5));
    route.positions.push(new RoutePosition(225, 34, -5));
    route.positions.push(new RoutePosition(283, 29, -5));

    route = new Route('Calgary', 'Winnipeg', Color.White, 50);
    this.routes.push(route);
    route.positions.push(new RoutePosition(378, 33, 10));
    route.positions.push(new RoutePosition(432, 43, 10));
    route.positions.push(new RoutePosition(486, 53, 10));
    route.positions.push(new RoutePosition(540, 63, 10));
    route.positions.push(new RoutePosition(594, 73, 10));
    route.positions.push(new RoutePosition(648, 83, 10));

    route = new Route('Winnipeg', 'Sault St. Marie', Color.Grey, 40);
    this.routes.push(route);
    route.positions.push(new RoutePosition(740, 102, 15));
    route.positions.push(new RoutePosition(784, 114, 15));
    route.positions.push(new RoutePosition(828, 126, 15));
    route.positions.push(new RoutePosition(872, 138, 15));
    route.positions.push(new RoutePosition(916, 150, 15));
    route.positions.push(new RoutePosition(960, 162, 15));

    route = new Route('Sault St. Marie', 'Montreal', Color.Black, 39);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1046, 168, -7));
    route.positions.push(new RoutePosition(1089, 163, -7));
    route.positions.push(new RoutePosition(1133, 158, -7));
    route.positions.push(new RoutePosition(1176, 153, -7));
    route.positions.push(new RoutePosition(1219, 152, 5));

    route = new Route('Montreal', 'Boston', Color.Grey, 42);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1286, 196, 50));
    route.positions.push(new RoutePosition(1316, 231, 50));

    route = new Route('Montreal', 'Boston', Color.Grey, 42);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1301, 184, 50));
    route.positions.push(new RoutePosition(1331, 219, 50));

    route = new Route('Vancouver', 'Seattle', Color.Grey, 30);
    this.routes.push(route);
    route.positions.push(new RoutePosition(107, 75, 94));

    route = new Route('Vancouver', 'Seattle', Color.Grey, 30);
    this.routes.push(route);
    route.positions.push(new RoutePosition(126, 76, 94));

    route = new Route('Seattle', 'Calgary', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(160, 105, 0));
    route.positions.push(new RoutePosition(209, 101, -10));
    route.positions.push(new RoutePosition(259, 88, -20));
    route.positions.push(new RoutePosition(303, 58, -50));

    route = new Route('Seattle', 'Billings', Color.Yellow, 44);
    this.routes.push(route);
    route.positions.push(new RoutePosition(150, 135, 30));
    route.positions.push(new RoutePosition(197, 154, 15));
    route.positions.push(new RoutePosition(245, 167, 15));
    route.positions.push(new RoutePosition(292, 180, 15));
    route.positions.push(new RoutePosition(339, 193, 15));
    route.positions.push(new RoutePosition(386, 206, 15));

    route = new Route('Calgary', 'Billings', Color.Grey, 40);
    this.routes.push(route);
    route.positions.push(new RoutePosition(346, 62, 60));
    route.positions.push(new RoutePosition(368, 101, 60));
    route.positions.push(new RoutePosition(390, 140, 60));
    route.positions.push(new RoutePosition(412, 179, 60));

    route = new Route('Billings', 'Winnipeg', Color.Blue, 58);
    this.routes.push(route);
    route.positions.push(new RoutePosition(470, 179, -40));
    route.positions.push(new RoutePosition(530, 154, -5));
    route.positions.push(new RoutePosition(593, 149, -5));
    route.positions.push(new RoutePosition(654, 126, -38));

    route = new Route('Billings', 'Minneapolis', Color.Orange, 49);
    this.routes.push(route);
    route.positions.push(new RoutePosition(480, 220, 8));
    route.positions.push(new RoutePosition(534, 228, 8));
    route.positions.push(new RoutePosition(588, 236, 8));
    route.positions.push(new RoutePosition(642, 244, 8));
    route.positions.push(new RoutePosition(696, 252, 8));
    route.positions.push(new RoutePosition(750, 260, 8));

    route = new Route('Winnipeg', 'Minneapolis', Color.Black, 37);
    this.routes.push(route);
    route.positions.push(new RoutePosition(715, 128, 58));
    route.positions.push(new RoutePosition(737, 163, 58));
    route.positions.push(new RoutePosition(759, 198, 58));
    route.positions.push(new RoutePosition(781, 233, 58));

    route = new Route('Minneapolis', 'Toronto', Color.Pink, 46);
    this.routes.push(route);
    route.positions.push(new RoutePosition(850, 264, -2));
    route.positions.push(new RoutePosition(901, 262, -2));
    route.positions.push(new RoutePosition(952, 260, -2));
    route.positions.push(new RoutePosition(1003, 258, -2));
    route.positions.push(new RoutePosition(1054, 256, -2));
    route.positions.push(new RoutePosition(1105, 254, -2));

    route = new Route('Minneapolis', 'Sault St. Marie', Color.Grey, 55);
    this.routes.push(route);
    route.positions.push(new RoutePosition(840, 231, -35));
    route.positions.push(new RoutePosition(898, 213, -2));
    route.positions.push(new RoutePosition(958, 200, -25));

    route = new Route('Sault St. Marie', 'Toronto', Color.Grey, 55);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1050, 202, 20));
    route.positions.push(new RoutePosition(1106, 224, 23));

    route = new Route('Seattle', 'Portland', Color.Grey, 40);
    this.routes.push(route);
    route.positions.push(new RoutePosition(92, 145, 113));

    route = new Route('Seattle', 'Portland', Color.Grey, 40);
    this.routes.push(route);
    route.positions.push(new RoutePosition(110, 153, 113));

    route = new Route('Portland', 'San Francisco', Color.Green, 40);
    this.routes.push(route);
    route.positions.push(new RoutePosition(55, 214, 120));
    route.positions.push(new RoutePosition(35, 255, 110));
    route.positions.push(new RoutePosition(23, 299, 100));
    route.positions.push(new RoutePosition(19, 343, 90));
    route.positions.push(new RoutePosition(19, 388, 90));

    route = new Route('Portland', 'San Francisco', Color.Pink, 38);
    this.routes.push(route);
    route.positions.push(new RoutePosition(73, 223, 120));
    route.positions.push(new RoutePosition(54, 262, 110));
    route.positions.push(new RoutePosition(43, 304, 100));
    route.positions.push(new RoutePosition(39, 347, 90));
    route.positions.push(new RoutePosition(39, 390, 90));

    route = new Route('Portland', 'Salt Lake City', Color.Blue, 40);
    this.routes.push(route);
    route.positions.push(new RoutePosition(118, 212, 40));
    route.positions.push(new RoutePosition(152, 240, 40));
    route.positions.push(new RoutePosition(186, 268, 40));
    route.positions.push(new RoutePosition(220, 296, 40));
    route.positions.push(new RoutePosition(254, 324, 40));
    route.positions.push(new RoutePosition(288, 352, 40));

    route = new Route('San Francisco', 'Salt Lake City', Color.Orange, 43);
    this.routes.push(route);
    route.positions.push(new RoutePosition(76, 413, -10));
    route.positions.push(new RoutePosition(123, 405, -10));
    route.positions.push(new RoutePosition(170, 397, -10));
    route.positions.push(new RoutePosition(217, 389, -10));
    route.positions.push(new RoutePosition(264, 381, -10));

    route = new Route('San Francisco', 'Salt Lake City', Color.White, 43);
    this.routes.push(route);
    route.positions.push(new RoutePosition(80, 433, -10));
    route.positions.push(new RoutePosition(127, 425, -10));
    route.positions.push(new RoutePosition(174, 417, -10));
    route.positions.push(new RoutePosition(221, 409, -10));
    route.positions.push(new RoutePosition(268, 401, -10));

    route = new Route('Salt Lake City', 'Billings', Color.Pink, 48);
    this.routes.push(route);
    route.positions.push(new RoutePosition(344, 341, -57));
    route.positions.push(new RoutePosition(372, 297, -57));
    route.positions.push(new RoutePosition(400, 253, -57));

    route = new Route('San Francisco', 'Los Angeles', Color.Yellow, 40);
    this.routes.push(route);
    route.positions.push(new RoutePosition(28, 473, 75));
    route.positions.push(new RoutePosition(44, 516, 65));
    route.positions.push(new RoutePosition(70, 554, 45));

    route = new Route('San Francisco', 'Los Angeles', Color.Pink, 36);
    this.routes.push(route);
    route.positions.push(new RoutePosition(47, 466, 75));
    route.positions.push(new RoutePosition(61, 505, 65));
    route.positions.push(new RoutePosition(85, 540, 45));

    route = new Route('Los Angeles', 'Las Vegas', Color.Grey, 37);
    this.routes.push(route);
    route.positions.push(new RoutePosition(135, 544, -40));
    route.positions.push(new RoutePosition(174, 527, -8));

    route = new Route('Las Vegas', 'Salt Lake City', Color.Orange, 40);
    this.routes.push(route);
    route.positions.push(new RoutePosition(249, 496, -45));
    route.positions.push(new RoutePosition(278, 462, -55));
    route.positions.push(new RoutePosition(300, 423, -65));

    route = new Route('Billings', 'Denver', Color.Green, 44);
    this.routes.push(route);
    route.positions.push(new RoutePosition(436, 260, 80));
    route.positions.push(new RoutePosition(453, 306, 60));
    route.positions.push(new RoutePosition(473, 350, 73));
    route.positions.push(new RoutePosition(487, 396, 73));

    route = new Route('Salt Lake City', 'Denver', Color.Red, 43);
    this.routes.push(route);
    route.positions.push(new RoutePosition(364, 385, 20));
    route.positions.push(new RoutePosition(409, 401, 20));
    route.positions.push(new RoutePosition(454, 417, 20));

    route = new Route('Salt Lake City', 'Denver', Color.Yellow, 43);
    this.routes.push(route);
    route.positions.push(new RoutePosition(357, 404, 20));
    route.positions.push(new RoutePosition(402, 420, 20));
    route.positions.push(new RoutePosition(447, 436, 20));

    route = new Route('Los Angeles', 'El Paso', Color.Black, 53);
    this.routes.push(route);
    route.positions.push(new RoutePosition(140, 610, 40));
    route.positions.push(new RoutePosition(185, 645, 35));
    route.positions.push(new RoutePosition(233, 676, 30));
    route.positions.push(new RoutePosition(286, 698, 15));
    route.positions.push(new RoutePosition(343, 708, 5));
    route.positions.push(new RoutePosition(400, 710, 0));

    route = new Route('Los Angeles', 'Phoenix', Color.Grey, 44);
    this.routes.push(route);
    route.positions.push(new RoutePosition(149, 583, 14));
    route.positions.push(new RoutePosition(197, 595, 14));
    route.positions.push(new RoutePosition(245, 606, 14));

    route = new Route('Phoenix', 'Denver', Color.White, 42);
    this.routes.push(route);
    route.positions.push(new RoutePosition(313, 580, -50));
    route.positions.push(new RoutePosition(348, 549, -35));
    route.positions.push(new RoutePosition(390, 527, -22));
    route.positions.push(new RoutePosition(432, 505, -35));
    route.positions.push(new RoutePosition(466, 473, -50));

    route = new Route('Phoenix', 'Santa Fe', Color.Grey, 43);
    this.routes.push(route);
    route.positions.push(new RoutePosition(330, 607, -15));
    route.positions.push(new RoutePosition(375, 593, -20));
    route.positions.push(new RoutePosition(420, 577, -20));

    route = new Route('Phoenix', 'El Paso', Color.Grey, 44);
    this.routes.push(route);
    route.positions.push(new RoutePosition(326, 643, 30));
    route.positions.push(new RoutePosition(371, 661, 14));
    route.positions.push(new RoutePosition(415, 680, 35));

    route = new Route('El Paso', 'Santa Fe', Color.Grey, 46);
    this.routes.push(route);
    route.positions.push(new RoutePosition(453, 661, -88));
    route.positions.push(new RoutePosition(455, 610, -88));

    route = new Route('Santa Fe', 'Denver', Color.Grey, 43);
    this.routes.push(route);
    route.positions.push(new RoutePosition(478, 530, -60));
    route.positions.push(new RoutePosition(494, 486, -80));

    route = new Route('Denver', 'Omaha', Color.Pink, 45);
    this.routes.push(route);
    route.positions.push(new RoutePosition(532, 408, -35));
    route.positions.push(new RoutePosition(580, 393, 0));
    route.positions.push(new RoutePosition(630, 393, 0));
    route.positions.push(new RoutePosition(679, 391, -5));

    route = new Route('Billings', 'Omaha', Color.Red, 56);
    this.routes.push(route);
    route.positions.push(new RoutePosition(468, 251, 45));
    route.positions.push(new RoutePosition(518, 285, 25));
    route.positions.push(new RoutePosition(574, 307, 18));
    route.positions.push(new RoutePosition(632, 325, 18));
    route.positions.push(new RoutePosition(685, 355, 40));

    route = new Route('Omaha', 'Minneapolis', Color.Grey, 45);
    this.routes.push(route);
    route.positions.push(new RoutePosition(738, 343, -58));
    route.positions.push(new RoutePosition(764, 301, -58));

    route = new Route('Omaha', 'Minneapolis', Color.Grey, 45);
    this.routes.push(route);
    route.positions.push(new RoutePosition(756, 353, -58));
    route.positions.push(new RoutePosition(782, 311, -58));

    route = new Route('Minneapolis', 'Chicago', Color.Red, 36);
    this.routes.push(route);
    route.positions.push(new RoutePosition(831, 294, 38));
    route.positions.push(new RoutePosition(871, 307, 0));
    route.positions.push(new RoutePosition(910, 320, 40));

    route = new Route('Omaha', 'Kansas City', Color.Grey, 42);
    this.routes.push(route);
    route.positions.push(new RoutePosition(733, 432, 65));

    route = new Route('Omaha', 'Kansas City', Color.Grey, 42);
    this.routes.push(route);
    route.positions.push(new RoutePosition(751, 424, 65));

    route = new Route('Omaha', 'Chicago', Color.Blue, 39);
    this.routes.push(route);
    route.positions.push(new RoutePosition(769, 388, 0));
    route.positions.push(new RoutePosition(812, 381, -20));
    route.positions.push(new RoutePosition(853, 366, -20));
    route.positions.push(new RoutePosition(894, 355, -10));

    route = new Route('Chicago', 'Toronto', Color.White, 46);
    this.routes.push(route);
    route.positions.push(new RoutePosition(972, 323, -30));
    route.positions.push(new RoutePosition(1021, 308, -5));
    route.positions.push(new RoutePosition(1072, 304, -5));
    route.positions.push(new RoutePosition(1120, 285, -40));

    route = new Route('Toronto', 'Pittsburgh', Color.Grey, 30);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1153, 293, 95));
    route.positions.push(new RoutePosition(1150, 327, 95));

    route = new Route('Boston', 'New York', Color.Yellow, 25);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1331, 269, -50));
    route.positions.push(new RoutePosition(1312, 292, -50));

    route = new Route('Boston', 'New York', Color.Red, 25);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1347, 281, -50));
    route.positions.push(new RoutePosition(1328, 304, -50));

    route = new Route('Montreal', 'New York', Color.Blue, 41);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1251, 202, 100));
    route.positions.push(new RoutePosition(1250, 247, 82));
    route.positions.push(new RoutePosition(1272, 290, 45));

    route = new Route('Toronto', 'Montreal', Color.Grey, 32);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1226, 180, -30));
    route.positions.push(new RoutePosition(1191, 192, -5));
    route.positions.push(new RoutePosition(1163, 215, -75));

    route = new Route('New York', 'Washington', Color.Orange, 32);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1290, 354, 100));
    route.positions.push(new RoutePosition(1263, 382, -10));

    route = new Route('New York', 'Washington', Color.Black, 46);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1308, 365, 100));
    route.positions.push(new RoutePosition(1273, 400, -10));

    route = new Route('Pittsburgh', 'New York', Color.White, 52);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1192, 339, -18));
    route.positions.push(new RoutePosition(1246, 322, -18));

    route = new Route('Pittsburgh', 'New York', Color.Green, 52);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1198, 357, -18));
    route.positions.push(new RoutePosition(1252, 340, -18));
  }
}