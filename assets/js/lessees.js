// $(".lessees_map").exists()
var InteractiveMap = /** @class */ (function () {
  function InteractiveMap() {
    var _this = this;
    this.mapData = [];
    this.plotFigures = [];
    this.places = [];
    this.zoom = 1;
    this.loadSVG = function (file) {
      Snap.load(file, _this.onSVGLoaded);
    };
    this.toggleBusyPlots = function (active) {
      _this.plotFigures.forEach(function (figure) {
        var busy = figure.data('busy');
        if (busy) {
          if (active) {
            figure.addClass('marked_busy');
          } else {
            figure.removeClass('marked_busy');
            figure.attr({fill: "#f2f2f2"});
          }
        }
      });
    };
    this.toggleFreePlots = function (active) {
      _this.plotFigures.forEach(function (figure) {
        var busy = figure.data('busy');
        if (!busy || undefined) {
          if (active) {
            figure.addClass('marked_free');
          } else {
            figure.removeClass('marked_free');
            figure.attr({fill: "#f2f2f2"});
          }
        }
      });
    };
    this.toggleZone = function (zoneId, active, color) {
      var id = parseInt(zoneId, 10);
      var zonePlots = _this.mapData.filter(function (plot) {
        return plot.ZoneId === id;
      });
      _this.plotFigures.forEach(function (figure) {
        var objId = parseInt(figure.node.id.split('obj_')[1]);
        zonePlots.forEach(function (plot) {
          if (plot.PlotId === objId) {
            if (active) {
              figure.attr({fill: color});
            } else {
              figure.attr({fill: "#f2f2f2"});
            }
          }
        });
      });
    };
    this.tooglePlaces = function (placeId, active) {
      _this.places.forEach(function (place) {
        var id = place.node.id;
        if (placeId === id) {
          if (active) {
            place.addClass('active');
          } else {
            place.removeClass('active');
          }
        }
      });
    };
    this.onSVGLoaded = function (data) {
      Snap('#lessees_map_svg').append(data);
      var polygon = Snap.selectAll("#plots polygon");
      var places = Snap.selectAll("#places > g");
      _this.plotFigures = polygon;
      _this.places = places;
      _this.attachPlots(polygon);
    };
    this.attachPlots = function (figures) {
      figures.forEach(function (figure) {
        figure.attr({fill: "#f2f2f2"});
        var objId = parseInt(figure.node.id.split('obj_')[1]);
        _this.mapData.forEach(function (plot) {
          if (plot.PlotId == objId) {
            figure.data('busy', plot.IsBusy);
          }
        });
        _this.onClickPlot(figures, figure, objId);
        _this.onHoverPlot(figure);
      });
    };
    this.onClickPlot = function (figures, figure, objId) {
      figure.click(function () {
        figures.forEach(function (figure) {
          figure.removeClass('selected');
        });
        figure.addClass("selected");
        var plotData = _this.mapData.filter(function (plot) {
          return plot.PlotId == objId;
        });
        if (plotData.length) {
          _this.outputPlotData(plotData[0]);
        } else {
          figure.removeClass('selected');
        }
      });
    };
    this.onHoverPlot = function (figure) {
      figure.hover(function () {
        figure.attr({fill: "#E2E2E2"});
      }, function () {
        figure.attr({fill: "#f2f2f2"});
      });
    };
    this.outputPlotData = function (plotData) {
      var title = plotData.Title ? "<div><span>\u041D\u043E\u043C\u0435\u0440 \u0443\u0447\u0430\u0441\u0442\u043A\u0430: </span>" + (plotData.Title ? plotData.Title : '-') + "</div>" : '';
      var busy = "<div><span>\u0421\u0442\u0430\u0442\u0443\u0441: </span>" + (plotData.IsBusy ? 'Р—Р°РЅСЏС‚Рѕ' : 'РЎРІРѕР±РѕРґРЅРѕ') + "</div>";
      var area = plotData.Area ? "<div><span>\u041F\u043B\u043E\u0449\u0430\u0434\u044C: </span>" + (plotData.Area ? plotData.Area : '-') + "</div>" : '';
      var prop = plotData.Proportions ? "<div><span>\u0420\u0430\u0437\u043C\u0435\u0440\u044B: </span>" + (plotData.Proportions ? plotData.Proportions : '-') + "</div>" : '';
      var zones = plotData.Zones ? "<div><span>\u0417\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435: </span>" + (plotData.Zones ? plotData.Zones : '-') + "</div>" : '';
      var desc = plotData.Description ? "<div><span>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435: </span>" + (plotData.Description ? plotData.Description : '-') + "</div>" : '';
      $('.lessees_obj_info').html('').append(title + busy + area + prop + zones + desc);
    };
    this.setDragable = function () {
      setTimeout(function () {
        var css = $('.lessees_map_zoom').css('transform');
        console.log(css);
        if (css !== 'matrix(1, 0, 0, 1, 0, 0)'){
          var myBlock = document.getElementById('lessees_map_cover');
          var mc = new Hammer(myBlock);
          mc.add(new Hammer.Pan({
            direction: Hammer.DIRECTION_ALL,
            threshold: 0
          }));
          var lastPosX = 0;
          var lastPosY = 0;
          var isDragging = false;
          var handleDrag = function (ev) {
            var elem = ev.target.closest("#lessees_map_cover");
            if (!isDragging) {
              isDragging = true;
              lastPosX = elem.offsetLeft;
              lastPosY = elem.offsetTop;
            }
            var posX = lastPosX + ev.deltaX / _this.zoom;
            var posY = lastPosY + ev.deltaY / _this.zoom;
            //console.log(posX, posY);
            var maxposx = null;
            var maxposy = null;
            if ($('body').hasClass('mobile')) {
              maxposx = Math.round($('#lessees_map_cover').width() / 100 * 30);
              maxposy = Math.round($('#lessees_map_cover').height() / 100 * 30);
            } else {
              maxposx = Math.round($('#lessees_map_cover').width() / 100 * 30);
              maxposy = Math.round($('#lessees_map_cover').height() / 100 * 30);
            }
            if (posX > maxposx) {
              elem.style.left = maxposx + "px";
            } else if (posX < -maxposx) {
              elem.style.left = -maxposx + "px";
            } else {
              elem.style.left = posX + "px";
            }
            if (posY > maxposy) {
              elem.style.top = maxposy + "px";
            } else if (posY < -maxposy) {
              elem.style.top = -maxposy + "px";
            } else {
              elem.style.top = posY + "px";
            }
            if (ev.isFinal) {
              isDragging = false;
            }
          };
          mc.on("pan", handleDrag);
        }
      }, 0);

    };
    this.zoomIn = function () {
      var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/;
      var zoom_paper = $('.lessees_map').find('.lessees_map_zoom');
      var transform = zoom_paper.css('transform').match(matrixRegex);
      var scaleX = Number(transform[1]) + 1;
      var scaleY = Number(transform[2]) + 1;
      zoom_paper.css('transform', 'matrix(' + scaleX + ', 0, 0, ' + scaleY + ', 0, 0)');
      _this.zoom = _this.zoom + 1;
      this.setDragable();
    };
    this.zoomOut = function () {
      var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/;
      var zoom_paper = $('.lessees_map').find('.lessees_map_zoom');
      var transform = zoom_paper.css('transform').match(matrixRegex);
      var scaleX = Number(transform[1]) - 2.5;
      var scaleY = Number(transform[2]) - 2.5;
      if (scaleX < 1) {
        _this.zoom = 1;
        zoom_paper.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
      } else {
        _this.zoom = _this.zoom - 1;
        zoom_paper.css('transform', 'matrix(' + scaleX + ', 0, 0, ' + scaleY + ', 0, 0)');
      }
      this.setDragable();
    };
    this.mapData = this.getMapData();
    this.setDragable();
  }

  InteractiveMap.prototype.getMapData = function () {
    var mapData = [];
    $.ajax({
      'async': false,
      'url': "/home/getmapzones",
      'success': function (data) {
        mapData = data;
      }
    });
    return mapData;
  };
  return InteractiveMap;
}());
var SVGMap = new InteractiveMap();
SVGMap.loadSVG('/Content/images/newMap.svg');
$('.checkbox_free_zone input#busy').change(function (e) {
  if (e.currentTarget.checked) {
    SVGMap.toggleBusyPlots(true);
  } else {
    SVGMap.toggleBusyPlots(false);
  }
});
$('.checkbox_free_zone input#free').change(function (e) {
  if (e.currentTarget.checked) {
    SVGMap.toggleFreePlots(true);
  } else {
    SVGMap.toggleFreePlots(false);
  }
});
$('.checkbox_cover_zones input[type="checkbox"]').change(function (e) {
  var zone = e.currentTarget;
  var active = zone.checked;
  var value = zone.value;
  var color = zone.dataset.color || "#9595cb";
  SVGMap.toggleZone(value, active, color);
});
$('.lessees_infrastructure input[type="checkbox"]').change(function (e) {
  var places = e.currentTarget;
  var active = places.checked;
  var value = places.value;
  SVGMap.tooglePlaces(value, active);
});
$(document).on('click', '.lessees_map_zoom_btns .minus', function () {
  SVGMap.zoomOut();
});
$(document).on('click', '.lessees_map_zoom_btns .plus', function () {
  SVGMap.zoomIn();
});