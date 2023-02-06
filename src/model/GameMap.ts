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
    let route = new Route('Vancouver', 'Calgary', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(165, 39, -5));
    route.positions.push(new RoutePosition(225, 34, -5));
    route.positions.push(new RoutePosition(285, 29, -5));

    route = new Route('Calgary', 'Winnipeg', Color.White);
    this.routes.push(route);
    route.positions.push(new RoutePosition(370, 33, 10));
    route.positions.push(new RoutePosition(427, 43, 10));
    route.positions.push(new RoutePosition(484, 53, 10));
    route.positions.push(new RoutePosition(541, 63, 10));
    route.positions.push(new RoutePosition(598, 73, 10));
    route.positions.push(new RoutePosition(655, 83, 10));

    route = new Route('Winnipeg', 'Sault St. Marie', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(732, 100, 15));
    route.positions.push(new RoutePosition(780, 113, 15));
    route.positions.push(new RoutePosition(828, 126, 15));
    route.positions.push(new RoutePosition(876, 139, 15));
    route.positions.push(new RoutePosition(924, 152, 15));
    route.positions.push(new RoutePosition(972, 165, 15));

    route = new Route('Sault St. Marie', 'Montreal', Color.Black);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1038, 173, -4));
    route.positions.push(new RoutePosition(1086, 170, -4));
    route.positions.push(new RoutePosition(1134, 167, -4));
    route.positions.push(new RoutePosition(1182, 164, -4));
    route.positions.push(new RoutePosition(1230, 161, -4));

    route = new Route('Montreal', 'Boston', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1285, 195, 50));
    route.positions.push(new RoutePosition(1317, 233, 50));

    route = new Route('Montreal', 'Boston', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1300, 183, 50));
    route.positions.push(new RoutePosition(1332, 221, 50));

    route = new Route('Vancouver', 'Seattle', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(107, 75, 94));

    route = new Route('Vancouver', 'Seattle', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(126, 76, 94));

    route = new Route('Seattle', 'Calgary', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(160, 105, 0));
    route.positions.push(new RoutePosition(209, 101, -10));
    route.positions.push(new RoutePosition(259, 88, -20));
    route.positions.push(new RoutePosition(303, 58, -50));

    route = new Route('Seattle', 'Billings', Color.Yellow);
    this.routes.push(route);
    route.positions.push(new RoutePosition(150, 129, 17));
    route.positions.push(new RoutePosition(199, 144, 17));
    route.positions.push(new RoutePosition(248, 159, 17));
    route.positions.push(new RoutePosition(297, 174, 17));
    route.positions.push(new RoutePosition(346, 189, 17));
    route.positions.push(new RoutePosition(395, 204, 17));

    route = new Route('Calgary', 'Billings', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(344, 56, 60));
    route.positions.push(new RoutePosition(369, 98, 60));
    route.positions.push(new RoutePosition(394, 140, 60));
    route.positions.push(new RoutePosition(419, 182, 60));

    route = new Route('Billings', 'Winnipeg', Color.Blue);
    this.routes.push(route);
    route.positions.push(new RoutePosition(485, 190, -26));
    route.positions.push(new RoutePosition(535, 166, -26));
    route.positions.push(new RoutePosition(585, 142, -26));
    route.positions.push(new RoutePosition(635, 118, -26));

    route = new Route('Billings', 'Minneapolis', Color.Orange);
    this.routes.push(route);
    route.positions.push(new RoutePosition(470, 220, 8));
    route.positions.push(new RoutePosition(527, 228, 8));
    route.positions.push(new RoutePosition(584, 236, 8));
    route.positions.push(new RoutePosition(641, 244, 8));
    route.positions.push(new RoutePosition(698, 252, 8));
    route.positions.push(new RoutePosition(755, 260, 8));

    route = new Route('Winnipeg', 'Minneapolis', Color.Black);
    this.routes.push(route);
    route.positions.push(new RoutePosition(700, 128, 90));
    route.positions.push(new RoutePosition(725, 172, 34));
    route.positions.push(new RoutePosition(770, 192, 15));
    route.positions.push(new RoutePosition(798, 230, 90));

    route = new Route('Minneapolis', 'Toronto', Color.Pink);
    this.routes.push(route);
    route.positions.push(new RoutePosition(850, 264, -1));
    route.positions.push(new RoutePosition(903, 263, -1));
    route.positions.push(new RoutePosition(956, 262, -1));
    route.positions.push(new RoutePosition(1009, 261, -1));
    route.positions.push(new RoutePosition(1062, 260, -1));
    route.positions.push(new RoutePosition(1115, 259, -1));

    route = new Route('Minneapolis', 'Sault St. Marie', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(850, 235, -20));
    route.positions.push(new RoutePosition(905, 215, -20));
    route.positions.push(new RoutePosition(960, 195, -20));

    route = new Route('Sault St. Marie', 'Toronto', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(1050, 205, 25));
    route.positions.push(new RoutePosition(1100, 228, 25));

    route = new Route('Seattle', 'Portland', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(92, 145, 113));

    route = new Route('Seattle', 'Portland', Color.Grey);
    this.routes.push(route);
    route.positions.push(new RoutePosition(110, 153, 113));

    route = new Route('Portland', 'San Francisco', Color.Green);
    this.routes.push(route);
    route.positions.push(new RoutePosition(55, 210, 120));
    route.positions.push(new RoutePosition(35, 253, 110));
    route.positions.push(new RoutePosition(23, 299, 100));
    route.positions.push(new RoutePosition(19, 346, 90));
    route.positions.push(new RoutePosition(19, 394, 90));

    route = new Route('Portland', 'San Francisco', Color.Pink);
    this.routes.push(route);
    route.positions.push(new RoutePosition(74, 217, 120));
    route.positions.push(new RoutePosition(54, 260, 110));
    route.positions.push(new RoutePosition(42, 306, 100));
    route.positions.push(new RoutePosition(38, 353, 90));
    route.positions.push(new RoutePosition(38, 401, 90));

    route = new Route('Portland', 'Salt Lake City', Color.Blue);
    this.routes.push(route);
    route.positions.push(new RoutePosition(113, 204, 41));
    route.positions.push(new RoutePosition(149, 235, 41));
    route.positions.push(new RoutePosition(185, 266, 41));
    route.positions.push(new RoutePosition(221, 297, 41));
    route.positions.push(new RoutePosition(257, 328, 41));
    route.positions.push(new RoutePosition(293, 359, 41));

    route = new Route('San Francisco', 'Salt Lake City', Color.Orange);
    this.routes.push(route);
    route.positions.push(new RoutePosition(73, 415, -10));
    route.positions.push(new RoutePosition(120, 407, -10));
    route.positions.push(new RoutePosition(167, 399, -10));
    route.positions.push(new RoutePosition(214, 391, -10));
    route.positions.push(new RoutePosition(261, 383, -10));

    route = new Route('San Francisco', 'Salt Lake City', Color.White);
    this.routes.push(route);
    route.positions.push(new RoutePosition(77, 435, -10));
    route.positions.push(new RoutePosition(124, 427, -10));
    route.positions.push(new RoutePosition(171, 419, -10));
    route.positions.push(new RoutePosition(218, 411, -10));
    route.positions.push(new RoutePosition(265, 403, -10));

    route = new Route('Salt Lake City', 'Billings', Color.Pink);
    this.routes.push(route);
    route.positions.push(new RoutePosition(345, 345, -55));
    route.positions.push(new RoutePosition(376, 300, -55));
    route.positions.push(new RoutePosition(407, 255, -55));

    route = new Route('San Francisco', 'Los Angeles', Color.Yellow);
    this.routes.push(route);
    route.positions.push(new RoutePosition(25, 465, 75));
    route.positions.push(new RoutePosition(42, 513, 65));
    route.positions.push(new RoutePosition(70, 556, 45));

    route = new Route('San Francisco', 'Los Angeles', Color.Pink);
    this.routes.push(route);
    route.positions.push(new RoutePosition(43, 460, 75));
    route.positions.push(new RoutePosition(60, 506, 65));
    route.positions.push(new RoutePosition(88, 547, 45));

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
  }
}