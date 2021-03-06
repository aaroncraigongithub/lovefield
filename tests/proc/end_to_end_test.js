/**
 * @license
 * Copyright 2014 The Lovefield Project Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
goog.setTestOnly();
goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.jsunit');
goog.require('hr.db');
goog.require('lf.testing.EndToEndTester');
goog.require('lf.testing.hrSchema.getSchemaBuilder');


/** @type {!goog.testing.AsyncTestCase} */
var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall(
    'EndToEndTest');


/** @type {number} */
asyncTestCase.stepTimeout = 10 * 1000;  // 10 seconds


function testEndToEnd_StaticSchema() {
  asyncTestCase.waitForAsync('testEndToEnd_StaticSchema');
  var tester = new lf.testing.EndToEndTester(
      hr.db.getGlobal(),
      hr.db.connect);
  tester.run().then(function() {
    asyncTestCase.continueTesting();
  });
}


function testEndToEnd_DynamicSchema() {
  asyncTestCase.waitForAsync('testEndToEnd_DynamicSchema');
  var builder = lf.testing.hrSchema.getSchemaBuilder();
  var tester = new lf.testing.EndToEndTester(
      builder.getGlobal(),
      builder.connect.bind(builder));
  tester.run().then(function() {
    asyncTestCase.continueTesting();
  });
}
