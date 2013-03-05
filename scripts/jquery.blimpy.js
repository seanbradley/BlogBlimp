(function($) {
            $(document).ready(function() {
            
                $('#blimp')
                    .sprite({
                        fps: 9, 
                        no_of_frames: 3,
                        // the following are optional: new in version 0.6...
                        start_at_frame: 2,
                        on_first_frame: function(obj) {
                            if (window.console) {
                                console.log('first frame');
                            }
                        },
                        on_last_frame: function(obj) {
                            // you could stop the sprite here with, e.g.
                            // obj.spStop();
                            if (window.console) {
                                console.log('last frame');
                            }
                        },
                        on_frame: {
                            2: function(obj) {
                                // you could change the 'state' of the
                                // sprite here with, e.g. obj.spState(2);
                                if (window.console) {
                                    console.log('frame 2');
                                }
                            }
                        }
                    })
                    .spRandom({top: 200, bottom: 350, left: 320, right: 480})
                    .isDraggable()
                    .activeOnClick()
                    .active();
                $('#clouds').pan({fps: 30, speed: 0.7, dir: 'left', depth: 10});
                $('#skyline2').pan({fps: 30, speed: 2, dir: 'left', depth: 30});
                $('#skyline1').pan({fps: 30, speed: 3, dir: 'left', depth: 70});
                $('#balloons').pan({fps: 30, speed: 3, dir: 'up', depth: 70});
                $('#skyline1, #skyline2, #clouds').spRelSpeed(8);
                
                window.actions = {
                    fly_slowly_forwards: function() {
                        $('#blimp')
                            .fps(10)
                            .spState(1);
                        $('#skyline1, #skyline2, #clouds')
                            .spRelSpeed(10)
                            .spChangeDir('left');
                    },
                    fly_slowly_backwards: function() {
                        $('#blimp')
                            .fps(10)
                            .spState(2);
                        $('#skyline1, #skyline2, #clouds')
                            .spRelSpeed(10)
                            .spChangeDir('right');
                    },
                    fly_quickly_forwards: function() {
                        $('#blimp')
                            .fps(20)
                            .spState(1);
                        $('#skyline1, #skyline2, #clouds')
                            .spRelSpeed(30)
                            .spChangeDir('left');
                    },
                    fly_quickly_backwards: function() {
                        $('#blimp')
                            .fps(20)
                            .spState(2);
                        $('#skyline1, #skyline2, #clouds')
                            .spRelSpeed(30)
                            .spChangeDir('right');
                    },
                    fly_like_lightning_forwards: function() {
                        $('#blimp')
                            .fps(25)
                            .spState(1);
                        $('#skyline1, #skyline2, #clouds')
                            .spSpeed(40)
                            .spChangeDir('left');
                    },
                    fly_like_lightning_backwards: function() {
                        $('#blimp')
                            .fps(25)
                            .spState(2);
                        $('#skyline1, #skyline2, #clouds')
                            .spSpeed(40)
                            .spChangeDir('right');
                    }
                };
                
                window.page = {
                    hide_panels: function() {
                        $('.panel').hide(300);
                    },
                    show_panel: function(el_id) {
                        this.hide_panels();
                        $(el_id).show(300);
                    }
                }
                
            });
        })(jQuery);
