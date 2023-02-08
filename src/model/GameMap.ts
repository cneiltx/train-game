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
    route.positions.push(new RoutePosition(1046, 171, -4));
    route.positions.push(new RoutePosition(1090, 168, -4));
    route.positions.push(new RoutePosition(1134, 165, -4));
    route.positions.push(new RoutePosition(1178, 162, -4));
    route.positions.push(new RoutePosition(1222, 159, -4));

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
    route.positions.push(new RoutePosition(838, 232, -35));
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

    route = new Route('Los Angeles', 'Las Vegas', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(137, 557, -25));
    route.positions.push(new RoutePosition(181, 537, -25));

    route = new Route('Las Vegas', 'Salt Lake City', Color.Orange);
    this.routes.push(route);
    route.positions.push(new RoutePosition(235, 495, -53));
    route.positions.push(new RoutePosition(264, 457, -53));
    route.positions.push(new RoutePosition(293, 419, -53));

    route = new Route('Billings', 'Denver', Color.Green);
    this.routes.push(route);
    route.positions.push(new RoutePosition(445, 258, 73));
    route.positions.push(new RoutePosition(459, 304, 73));
    route.positions.push(new RoutePosition(473, 350, 73));
    route.positions.push(new RoutePosition(487, 396, 73));

    route = new Route('Salt Lake City', 'Denver', Color.Red);
    this.routes.push(route);
    route.positions.push(new RoutePosition(362, 385, 20));
    route.positions.push(new RoutePosition(407, 401, 20));
    route.positions.push(new RoutePosition(452, 417, 20));

    route = new Route('Salt Lake City', 'Denver', Color.Yellow);
    this.routes.push(route);
    route.positions.push(new RoutePosition(354, 404, 20));
    route.positions.push(new RoutePosition(399, 420, 20));
    route.positions.push(new RoutePosition(444, 436, 20));

    route = new Route('Los Angeles', 'El Paso', Color.Black);
    this.routes.push(route);
    route.positions.push(new RoutePosition(150, 605, 20));
    route.positions.push(new RoutePosition(200, 623, 20));
    route.positions.push(new RoutePosition(250, 641, 20));
    route.positions.push(new RoutePosition(300, 659, 20));
    route.positions.push(new RoutePosition(350, 677, 20));
    route.positions.push(new RoutePosition(400, 695, 20));

    route = new Route('Los Angeles', 'Phoenix', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(157, 584, 14));
    route.positions.push(new RoutePosition(204, 596, 14));
    route.positions.push(new RoutePosition(251, 608, 14));

    route = new Route('Phoenix', 'Denver', Color.White);
    this.routes.push(route);
    route.positions.push(new RoutePosition(315, 590, -40));
    route.positions.push(new RoutePosition(352, 559, -40));
    route.positions.push(new RoutePosition(389, 528, -40));
    route.positions.push(new RoutePosition(426, 497, -40));
    route.positions.push(new RoutePosition(463, 466, -40));

    route = new Route('Phoenix', 'Santa Fe', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(339, 606, -20));
    route.positions.push(new RoutePosition(384, 590, -20));
    route.positions.push(new RoutePosition(429, 574, -20));

    route = new Route('Phoenix', 'El Paso', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(330, 640, 25));
    route.positions.push(new RoutePosition(375, 661, 25));
    route.positions.push(new RoutePosition(420, 682, 25));

    route = new Route('El Paso', 'Santa Fe', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(453, 658, -88));
    route.positions.push(new RoutePosition(455, 610, -88));

    route = new Route('Santa Fe', 'Denver', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(470, 532, -70));
    route.positions.push(new RoutePosition(487, 487, -70));

    route = new Route('Denver', 'Omaha', Color.Pink);
    this.routes.push(route);
    route.positions.push(new RoutePosition(542, 417, -8));
    route.positions.push(new RoutePosition(590, 410, -8));
    route.positions.push(new RoutePosition(638, 403, -8));
    route.positions.push(new RoutePosition(686, 396, -8));

    route = new Route('Billings', 'Omaha', Color.Red);
    this.routes.push(route);
    route.positions.push(new RoutePosition(480, 250, 30));
    route.positions.push(new RoutePosition(525, 275, 30));
    route.positions.push(new RoutePosition(570, 300, 30));
    route.positions.push(new RoutePosition(615, 325, 30));
    route.positions.push(new RoutePosition(660, 350, 30));

    route = new Route('Omaha', 'Minneapolis', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(738, 343, -58));
    route.positions.push(new RoutePosition(764, 301, -58));

    route = new Route('Omaha', 'Minneapolis', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(756, 353, -58));
    route.positions.push(new RoutePosition(782, 311, -58));

    route = new Route('Minneapolis', 'Chicago', Color.Red);
    this.routes.push(route);
    route.positions.push(new RoutePosition(825, 285, 30));
    route.positions.push(new RoutePosition(867, 309, 30));
    route.positions.push(new RoutePosition(909, 333, 30));

    route = new Route('Omaha', 'Kansas City', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(730, 426, 65));

    route = new Route('Omaha', 'Kansas City', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(748, 418, 65));

    route = new Route('Omaha', 'Chicago', Color.Blue);
    this.routes.push(route);
    route.positions.push(new RoutePosition(757, 382, -10));
    route.positions.push(new RoutePosition(804, 373, -10));
    route.positions.push(new RoutePosition(851, 364, -10));
    route.positions.push(new RoutePosition(898, 355, -10));

    route = new Route('Chicago', 'Toronto', Color.White);
    this.routes.push(route);
    route.positions.push(new RoutePosition(970, 325, -30));
    route.positions.push(new RoutePosition(1022, 310, -5));
    route.positions.push(new RoutePosition(1075, 306, -5));
    route.positions.push(new RoutePosition(1126, 286, -40));

    route = new Route('Toronto', 'Pittsburgh', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1174, 287, 60));
    route.positions.push(new RoutePosition(1170, 335, -50));

    route = new Route('Boston', 'New York', Color.Yellow);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1365, 288, 65));
    route.positions.push(new RoutePosition(1338, 310, -10));

    route = new Route('Boston', 'New York', Color.Red);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1386, 287, 65));
    route.positions.push(new RoutePosition(1365, 325, -10));

    route = new Route('Montreal', 'New York', Color.Blue);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1265, 195, 75));
    route.positions.push(new RoutePosition(1277, 241, 75));
    route.positions.push(new RoutePosition(1289, 287, 75));
  }
}